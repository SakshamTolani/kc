from datetime import datetime
from http.client import FORBIDDEN
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from base.products import products
from base.models import Coupon, Product, Order, OrderItem, ShippingAddress
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied
from base.serializers import CouponSerializer, ProductSerializer, OrderSerializer
from rest_framework import status
import requests
import json
import razorpay
import pytz
from django.db.models import F
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
            coupon=str(data['coupon']['code']) if data['coupon'] else ''
        )
        # increment used_by by 1
        if data['coupon']:
            c = Coupon.objects.filter(code__iexact=str(
                data['coupon']['code']), active=True).update(used_by=F("used_by") + 1)
        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            alternatePhone=data['shippingAddress']['alternatePhone'],
            alternateEmail=data['shippingAddress']['alternateEmail'],
        )

        # (3) Create order items and set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                size=i['size'],
                price=i['price'],
                image=product.image_one.url,
            )

        # send Mail to both the parties
        if order.paymentMethod == 'COD':
            # to send to admin about order
            message = Mail(
                from_email='team@kamsincollection.in',
                to_emails='kamsincollection@gmail.com',
                subject=f'NEW ORDER {order._id} FROM {shipping.city} of Rs. {str(float(order.totalPrice) - 40)} (COD)',
                html_content=f'<p><h4>New Order from {order.user.first_name}</h4></p><p>Order Amount is <strong>"Rs. {order.totalPrice}" </strong> and is placed on {order.createdAt}. </p><h2>Order number is "{order._id}".</h2><p><h1>Details are as follows: <p>Name: {order.user.first_name}</p> <p>Phone: {order.user}</p> <p>Address: {shipping.address},{shipping.city},{shipping.postalCode} </p></h1></p>')
            try:
                sg = SendGridAPIClient(
                    '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')
                response = sg.send(message)
                print(response.status_code)
                print(response.body)
                print(response.headers)
            except Exception as e:
                print(e.message)
            # to user for confirmation
            messageAgain = Mail(
                from_email='team@kamsincollection.in',
                to_emails=shipping.alternateEmail)
    # pass custom values for our HTML placeholders
            messageAgain.template_id = 'd-e442e498fb8045daa266b7cbd4c9f202'
            messageAgain.dynamic_template_data = {
                "sendName": str(order.user.first_name),
                "sendOrderId": str(order._id),
                "sendRevise": "",
                "sendAddress": str(shipping.address),
                "sendCity": str(shipping.city),
                "sendPin": str(shipping.postalCode),
                "sendPhone": str(order.user),
                "sendPaymentMethod": "COD",
                "sendSubTotal": str(float(order.totalPrice) + float(order.taxPrice)-float(order.shippingPrice)),
                "sendShipping": str(order.shippingPrice)+"+40 (COD Charges)",
                "sendDiscount": str(order.taxPrice),
                "sendTotal": str(order.totalPrice),
                # oItems = list(map(OrderItem.objects.filter(order=order),ord))
                "user":
                    {
                        "orderHistory": [
                            {
                                "sendImage": str(myOrd.image),
                                "sendProductName": str(myOrd.name),
                                "sendProductPrice": str(myOrd.price),
                                "sendProductQty": str(myOrd.qty),
                                "sendProductSize": str(myOrd.size) + " UK"
                            }
                            for myOrd in OrderItem.objects.filter(order=order)],
                }
            }
            try:
                sg = SendGridAPIClient(
                    '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')
                response = sg.send(messageAgain)
                code, body, headers = response.status_code, response.body, response.headers
                print(f"Response code: {code}")
                print(f"Response headers: {headers}")
                print(f"Response body: {body}")
                print("Dynamic Messages Sent!")
            except Exception as e:
                return Response("Error: {0}".format(e))

            # (4) Update size
            if (str(item.size) + " UK") == product.sizes.split(",")[0]:
                product.sizes = product.sizes.replace(
                    (str(item.size) + " UK,"), "")
            else:
                product.sizes = product.sizes.replace(
                    ("," + str(item.size) + " UK"), "")
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': "User not authorized to view this."},
                            status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Issues detected'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def razorpayOrder(request, pk):
    try:
        order = Order.objects.get(_id=pk)
        client = razorpay.Client(
            auth=("rzp_test_K9JE1h3dsDs81n", "Cm1njwXe0VdQzAG6JxasqZSw"))
        am = str((order.totalPrice)*100).split('.')[0] if order.paymentMethod == "Online" else str(
            ((order.totalPrice)*100)-4000).split('.')[0]
        DATA = {
            "amount": am,
            "currency": "INR",
            "receipt": "receipt_"+(str(order._id)),
            "notes": {
                "address": str(order.shippingaddress),
            },
        }
        myOrder = client.order.create(data=DATA)
        if myOrder:
            return Response(myOrder)
        else:
            return Response({'detail': "No order found"}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verifyPayment(request, pk):
    data = request.data
    orderCreationId = data['orderCreationId']
    razorpayPaymentId = data['razorpayPaymentId']
    razorpayOrderId = data['razorpayOrderId']
    razorpaySignature = data['razorpaySignature']
    secret = "Cm1njwXe0VdQzAG6JxasqZSw"
    client = razorpay.Client(
        auth=("rzp_test_K9JE1h3dsDs81n", "Cm1njwXe0VdQzAG6JxasqZSw"))
    params_dict = {
        'razorpay_order_id': orderCreationId,
        'razorpay_payment_id': razorpayPaymentId,
        'razorpay_signature': razorpaySignature
    }
    result = client.utility.verify_payment_signature(params_dict)
    if result is True:
        return Response({"msg": True})
    else:
        return Response({"msg": False})


@csrf_exempt
@api_view(['PUT'])
def updateOrderToPaid(request, pk):
    data = request.data
    order = Order.objects.get(_id=pk)
    shipping = ShippingAddress.objects.get(_id=pk)
    # oItems = OrderItem.objects.get(order=order)
    user = request.user
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    if order.isPaid:
        if order.paymentMethod == 'Online':
            message = Mail(
                from_email='team@kamsincollection.in',
                to_emails='kamsincollection@gmail.com',
                subject=f'NEW ORDER {order._id} FROM {shipping.city} of Rs. {order.totalPrice} (PREPAID)',
                html_content=f'<p><h4>New Order from {order.user.first_name}</h4></p><p>Order Amount is <strong>"Rs. {order.totalPrice}" </strong> and is placed on {str(order.paidAt).split(".")[0]}. </p><h2Order number is "{order._id}".</h2><p><h1>Details are as follows: <p>Name: {order.user.first_name}</p> <p>Phone: {order.user}</p> <p>Address: {shipping.address},{shipping.city},{shipping.postalCode} </p></h1></p>')
            try:
                sg = SendGridAPIClient(
                    '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')
                response = sg.send(message)
                print(response.status_code)
                print(response.body)
                print(response.headers)
            except Exception as e:
                print(e.message)
            messageAgain = Mail(
                from_email='team@kamsincollection.in',
                to_emails=shipping.alternateEmail)
    # pass custom values for our HTML placeholders
            messageAgain.template_id = 'd-e442e498fb8045daa266b7cbd4c9f202'
            messageAgain.dynamic_template_data = {
                "sendName": str(order.user.first_name),
                "sendOrderId": str(order._id),
                "sendRevise": "",
                "sendAddress": str(shipping.address),
                "sendCity": str(shipping.city),
                "sendPin": str(shipping.postalCode),
                "sendPhone": str(order.user),
                "sendPaymentMethod": str(order.paymentMethod),
                "sendSubTotal": str(float(order.totalPrice) + float(order.taxPrice)-float(order.shippingPrice)),
                "sendShipping": str(order.shippingPrice),
                "sendDiscount": str(order.taxPrice),
                "sendTotal": str(order.totalPrice),
                # oItems = list(map(OrderItem.objects.filter(order=order),ord))
                "user":
                    {
                        "orderHistory": [
                            {
                                "sendImage": str(myOrd.image),
                                "sendProductName": str(myOrd.name),
                                "sendProductPrice": str(myOrd.price),
                                "sendProductQty": str(myOrd.qty),
                                "sendProductSize": str(myOrd.size) + " UK"
                            }
                            for myOrd in OrderItem.objects.filter(order=order)],
                }
            }
            try:
                sg = SendGridAPIClient(
                    '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')
                response = sg.send(messageAgain)
                code, body, headers = response.status_code, response.body, response.headers
                print(f"Response code: {code}")
                print(f"Response headers: {headers}")
                print(f"Response body: {body}")
                print("Dynamic Messages Sent!")
            except Exception as e:
                return Response("Error: {0}".format(e))

        elif order.paymentMethod == 'COD':
            # Customer payment confirmation mail
            message = Mail(
                from_email='team@kamsincollection.in',
                to_emails='kamsincollection@gmail.com',
                subject=f'NEW ORDER {order._id} FROM {shipping.city} of Rs. {order.totalPrice - 40} (COD) which is paid now',
                html_content=f'<p><h4>New Order from {order.user.first_name}</h4></p><p>Order Amount is <strong>"Rs. {order.totalPrice}" </strong> and is placed on {order.createdAt}. </p><h2>Order number is "{order._id}".</h2><p><h1>Details are as follows: <p>Name: {order.user.first_name}</p> <p>Phone: {order.user}</p> <p>Address: {shipping.address},{shipping.city},{shipping.postalCode} </p></h1></p>')
            try:
                sg = SendGridAPIClient(
                    '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')
                response = sg.send(message)
                print(response.status_code)
                print(response.body)
                print(response.headers)
            except Exception as e:
                print(e.message)
            messageAgain = Mail(
                from_email='team@kamsincollection.in',
                to_emails=shipping.alternateEmail)
    # pass custom values for our HTML placeholders
            messageAgain.template_id = 'd-e442e498fb8045daa266b7cbd4c9f202'
            messageAgain.dynamic_template_data = {
                "sendName": str(order.user.first_name),
                "sendOrderId": str(order._id),
                "sendAddress": str(shipping.address),
                "sendRevise": "Revised",
                "sendCity": str(shipping.city),
                "sendPin": str(shipping.postalCode),
                "sendPhone": str(order.user),
                "sendPaymentMethod": str(order.paymentMethod),
                "sendSubTotal": str(float(order.totalPrice) + float(order.taxPrice)-float(order.shippingPrice)),
                "sendShipping": str(order.shippingPrice)+"+40 (COD Charges)",
                "sendDiscount": str(order.taxPrice),
                "sendTotal": str(float(order.totalPrice)-40),
                # oItems = list(map(OrderItem.objects.filter(order=order),ord))
                "user":
                    {
                        "orderHistory": [
                            {
                                "sendImage": str(myOrder.image),
                                "sendProductName": str(myOrder.name),
                                "sendProductPrice": str(myOrder.price) + "/piece",
                                "sendProductQty": str(myOrder.qty),
                                "sendProductSize": str(myOrder.size) + " UK"
                            }
                            for myOrder in OrderItem.objects.filter(order=order)],
                }
            }
            try:
                sg = SendGridAPIClient(
                    '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')
                response = sg.send(messageAgain)
                code, body, headers = response.status_code, response.body, response.headers
                print(f"Response code: {code}")
                print(f"Response headers: {headers}")
                print(f"Response body: {body}")
                print("Dynamic Messages Sent!")
            except Exception as e:
                return Response("Error: {0}".format(e))
    return Response(data)


@api_view(['PUT'])
def updateOrderToCancelled(request, pk):
    data = request.data
    order = Order.objects.get(_id=pk)
    shipping = ShippingAddress.objects.get(_id=pk)
    order.isCancelled = True
    order.cancelledAt = datetime.now()
    order.save()
    if order.isCancelled:
        message = Mail(
            from_email='team@kamsincollection.in',
            to_emails=shipping.alternateEmail,
            subject=f'Order Cancelled',
            html_content=f'<p><p>Hi {order.user.first_name},</p><p>As per your request for cancellation, Order Number "{order._id}"  has been cancelled at "{order.cancelledAt}".<br></br><br></br>You\'ll be getting the refund back(If any) within 3 business days from the date of cancellation. </p><p>It would be great if you could tell us the reason of cancellation. Did you expect something different or was it missing something you needed? Your feedback really helps us improve would be great to hear from you. <br></br> We hope to see you shop again soon.</p><p>Warm Regards</p><p>Team Kamsin Collection</p> </p>')
        try:
            sg = SendGridAPIClient(
                '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')
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e.message)
        messageAgain = Mail(
            from_email='team@kamsincollection.in',
            to_emails='kamsincollection@gmail.com',
            subject=f'ORDER CANCELLED with order number "{order._id}"',
            html_content=f'<p><h4>Order cancelled by {order.user.first_name}</h4></p><p>Order is cancelled on {order.cancelledAt}. </p><h2>Order number is "{order._id}".</h2><p><h1>Details are as follows: <p>Name: {order.user.first_name}</p> <p>Phone: {order.user}</p> <p>Address: {shipping.address},{shipping.city},{shipping.postalCode} </p></h1></p>')
        try:
            sg = SendGridAPIClient(
                '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')
            response = sg.send(messageAgain)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e.messageAgain)
    return Response("Order Cancelled Successfully.")


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)
    shipping = ShippingAddress.objects.get(_id=pk)
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    if order.isPaid and order.isDelivered:
        message = Mail(
            from_email='team@kamsincollection.in',
            to_emails=str(shipping.alternateEmail),
            subject='ORDER DELIVERED SUCCESSFULLY!',
            html_content=f'<p style={{fontSize:"1.5rem"}}><p>Hi <strong>{order.user.first_name}</strong>,</p><p>We are happy to let you know that your product with order number <strong>"{order._id}"</strong> has been delivered successfully.</p><p>In case you haven\'t recieved your order, please let us know at the earliest. <br></br><br></br> <strong>We take pride in making sure each customer has an amazing shopping experience. We would very much appreciate it if you would please take a few minutes of your time to review the product on our website.</strong></p> <p>Best Regards!</p> </p>')
        try:
            sg = SendGridAPIClient(
                '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')
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e.message)
    return Response('Order was delivered')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToUnpaid(request, pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = False
    order.paidAt = None
    order.save()
    return Response('Payment was succesfully deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCoupon(request):
    data = request.data
    coupon = Coupon.objects.create(
        code=data['code'],
        users=data['users'],
        valid_from=data['valid_from'],
        valid_to=data['valid_to'],
        discount=data['discount'],
        active=data['active'],
    )
    serializer = CouponSerializer(coupon, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getCoupons(request):
    data = request.data
    c = Coupon.objects.get(code__iexact=str(
        data['coupon']['code']), active=True)
    if c:
        print(c)
    coupons = Coupon.objects.all()
    serializer = CouponSerializer(coupons, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCoupon(request, prc, pk):
    # try:
    #     now = datetime.now()
    #     coupon = Coupon.objects.get(code=pk)
    #     order = Order.objects.get(
    #         user=request.user)
    #     coupon_qs = Coupon.objects.filter(code__iexact=pk, valid_from__lte=now,
    #                                       valid_to__gte=now, active=True)
    #     order_coupon = Order.objects.filter(
    #         coupon=coupon_qs.first(), user=request.user)
    #     if order_coupon:
    #         return Response({'detail': "Coupon already used"},
    #                         status=status.HTTP_400_BAD_REQUEST)
    #     if coupon_qs:
    #         order.coupon = coupon_qs[0]
    #         order.save()
    #         serializer = CouponSerializer(coupon, many=False)
    #         return Response(serializer.data)
    #     else:
    #         return Response({'detail': "Invalid Coupon Code"},
    #                         status=status.HTTP_400_BAD_REQUEST)
    # except:
    #     return Response({'detail': "You dont have any active order."},
    #                     status=status.HTTP_400_BAD_REQUEST)
    try:
        now = datetime.now()
        prc = float(prc)
        u = Coupon.objects.get(code__iexact=pk)
        users = u.users
        coupon = Coupon.objects.get(
            code__iexact=pk, valid_from__lte=now, valid_to__gte=now, down_value__lte=prc, users__gte=0, used_by__lt=users, active=True)
        order_coupon = Order.objects.filter(
            coupon=pk, user=request.user).values()
        if not order_coupon:
            serializer = CouponSerializer(coupon, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': "Coupon already used"},
                            status=status.HTTP_400_BAD_REQUEST)
    except ObjectDoesNotExist:
        return Response({'detail': "Invalid Coupon Code"},
                        status=status.HTTP_400_BAD_REQUEST)
    except PermissionDenied:
        return Response({'detail': "Coupon Code cannot be used anymore"},
                        status=status.HTTP_403_FORBIDDEN)
    except Exception as e:
        return Response({'detail': "Some error occured"},
                        status=status.HTTP_400_BAD_REQUEST)
