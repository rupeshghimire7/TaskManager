from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes # decorators to define function's qualities
from rest_framework.response import Response   # JSON Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser # To check permission of user requesting something
from rest_framework import status  # Status of Http request

from base.serializers import UserSerializer, UserSerializerWithToken  # Serialize user with token
from base.serializers import MyTokenObtainPairSerializer # Returns user with token for logging in

from django.contrib.auth.models import User  # USER MODEL
from django.contrib.auth.hashers import make_password # to hash the password obtained from user request


# Create Your Views Here

@api_view(['GET'])
def UserEndpoints(request):
    endpoints = {
        'login/' : "User Login",
        'register/': "Register new user",
        'profile/': "See your Profile",
        'profile/update/': "Update your profile",

        'users/': "See all users by admin",
        'id/': "See user of that id by admin",
        'delete/id/': "Delete user of that id by admin",
        'update/id/' : "Update user of that id by admin"
    }

    return Response(endpoints)



# Login User
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Register New User
@api_view(["POST"]) # decorator to specify function takes only POST request
def registerUser(request):

    data = request.data # get all data from request

    try: # creating a new user
        user = User.objects.create(
            first_name = data['name'],
            username = data['username'],
            email = data['email'],
            password = make_password(data['password'])
            )

        # Serialize above user with token
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    
    except:
        message = {'detail':'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    



# Update User Details by User Themselves
@api_view(["PUT"])
@permission_classes([IsAuthenticated]) # permission to make sure user is authenticated before accessing url of the control function
def updateUser(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    data = request.data

    user.first_name = data['name']
    user.username = data['username']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])
    
    user.save()
    # save user and return data i.e. user details with token
    return Response(serializer.data)



# check user's details
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)



# Get all user and details
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)




# Get user by ID
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserByID(request,id):
    user = User.objects.get(id=id)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)



# Update user by Admin
@api_view(['PUT']) 
@permission_classes([IsAdminUser])
def updateUserByAdmin(request, pk):
    user = User.objects.get(id=pk)
    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']
    
    user.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)




# Delete user by Admin
@api_view(['DELETE']) 
@permission_classes([IsAdminUser])
def deleteUser(request, id): 
    user= User.objects.get(id=id)
    user.delete()
    return Response('User was deleted')