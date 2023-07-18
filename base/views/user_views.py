from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import ContactUs
from base.serializers import ContactUsSerializer
from base.products import products
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from rest_framework import status
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email='',
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': "User with this email already exists."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complaintCreate(request):
    data = request.data
    user = request.user
    try:
        complaint = ContactUs.objects.create(
            user=user,
            compName=data['compName'],
            email=data['email'],
            phone=data['phone'],
            comments=data['comments'],
        )

        serializer = ContactUsSerializer(complaint, many=False)
    except:
        message = {
            'detail': "Unable to post your query. Please try after sometime"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        complaintData = serializer.data
        message = Mail(
            from_email='team@kamsincollection.in',
            to_emails='kamsincollection@gmail.com',
            subject=f'Complaint No:"{str(complaintData["_id"])}"',
            html_content=f'<h2>Full Name:  {complaintData["compName"]}<br></br>Phone Number:  {complaintData["phone"]} <br></br>Email: {complaintData["email"]} <br></br>Complaint: {complaintData["comments"]}</h2>')
        try:
            sg = SendGridAPIClient(
                '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')
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e.message)
    return Response('Done successfully')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    if user:
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    else:
        message = {'detail': "Due to some changes, please login again!"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user = request.user
    if user:
        print(user)
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    else:
        message = {'detail': "Due to some changes, please login again."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']
    serializer = UserSerializerWithToken(user, many=False)

    user.save()

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User Deleted Successfully')
