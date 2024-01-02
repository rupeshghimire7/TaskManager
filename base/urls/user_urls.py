from django.urls import path
from base.views import user_views as views
# 
from  rest_framework_simplejwt import views as jwt_views
# URLs here

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    path('register/', views.registerUser, name="register"), 
    path('login/', views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"), 
]
