from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes # decorators to define function's qualities
from rest_framework.response import Response   # JSON Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser # To check permission of user requesting something
from rest_framework import status  # Status of Http request

from base.serializers import UserSerializerWithToken  # Serialize user with token
from base.serializers import MyTokenObtainPairSerializer # Returns user with token for logging in

from django.contrib.auth.models import User  # USER MODEL
from django.contrib.auth.hashers import make_password # to hash the password obtained from user request


# Create Your Views Here


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
    

