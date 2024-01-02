from django.urls import path
from base.views import user_views as views
# 
from  rest_framework_simplejwt import views as jwt_views
# URLs here

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    # List of endpoints
    path('', views.UserEndpoints, name="endpoints"), 

    # User Account
    path('register/', views.registerUser, name="register"), 
    path('login/', views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"), 

    # By user themselves
    path('profile/', views.getUser, name="users-profile"), 
    path('profile/update/', views.updateUser, name="user-profile-update"),  

    # By Admin
    path('users/', views.getUsers, name="users"), 
    path('<str:pk>/', views.getUserByID, name='user'),
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'), 
    path('update/<str:pk>/', views.updateUserByAdmin, name='user-update'),
]
