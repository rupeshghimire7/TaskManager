from django.urls import path
from base.views import task_views as views


urlpatterns = [
    path('', views.home, name='homepage')
]
