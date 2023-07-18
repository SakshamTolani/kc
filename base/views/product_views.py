from datetime import datetime
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from base.models import Review
from base.models import Product
from dateutil.relativedelta import relativedelta
from base.serializers import ProductSerializer
from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    now = datetime.now() + relativedelta(months=+2)
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(
        name__icontains=query, createdAt__lte=now).order_by('-_id')
    if len(products) == 0:
        products = Product.objects.filter(name__icontains=query[:5])
    page = request.query_params.get('page')
    paginator = Paginator(products, 8)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    if page == None:
        page = 1
    page = int(page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getLadiesProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(
        name__icontains=query, category__icontains='ladies').order_by('price')
    if len(products) == 0:
        products = Product.objects.filter(
            name__icontains=query[:5], category__icontains='ladies')
    ladiesPage = request.query_params.get('ladiesPage')
    paginator = Paginator(products, 10)
    try:
        products = paginator.page(ladiesPage)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    if ladiesPage == None:
        ladiesPage = 1
    ladiesPage = int(ladiesPage)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'ladiesPage': ladiesPage, 'ladiesPages': paginator.num_pages})


@api_view(['GET'])
def getKidsProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(
        name__icontains=query, category__icontains='kids').order_by('price')
    if len(products) == 0:
        products = Product.objects.filter(
            name__icontains=query[:5], category__icontains='kids')
    kidsPage = request.query_params.get('kidsPage')
    paginator = Paginator(products, 10)
    try:
        products = paginator.page(kidsPage)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    if kidsPage == None:
        kidsPage = 1
    kidsPage = int(kidsPage)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'kidsPage': kidsPage, 'kidsPages': paginator.num_pages})


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=3).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    if user:
        product = Product.objects.create(
            user=user,
            name='Sample Product',
            price=0,
            lastPrice=0,
            brand='Sample Brand',
            category='ladies',
            countInStock=1,
            sizes="",
            productType='',
            productColour='',
            productOccasion='',
            productHeel='',
            productUMaterial=''

        )
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    else:
        message = {'detail': "Due to some changes, please login again!"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.price = data['price']
    product.lastPrice = data['lastPrice']
    product.brand = data['brand']
    product.category = data['category']
    product.countInStock = data['countInStock']
    product.sizes = data['sizes']
    product.productType = data['productType']
    product.productColour = data['productColour']
    product.productOccasion = data['productOccasion']
    product.productHeel = data['productHeel']
    product.productUMaterial = data['productUMaterial']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted Successfully.')


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image_one = request.FILES.get('image_one')
    product.image_two = request.FILES.get('image_two')
    product.save()
    return Response('Image was saved successfully.')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1- Reviewed already by a user
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #2- Rating is 0
    elif data['rating'] == 0:
        content = {'detail': 'No ratings provided. Please provide the rating.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3- Create a review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total/len(reviews)
        product.save()

        return Response('Review added successfully.')
