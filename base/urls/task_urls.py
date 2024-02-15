from django.urls import path
from base.views import task_views as views



urlpatterns = [
    path("",views.getTasks, name="tasks"),
    path("create/", views.createTask, name='create_task'),
    path("<str:pk>/", views.getTask, name='task'),
    path("update/<str:pk>/", views.updateTask, name="update_task"),
    path('delete/<str:pk>/', views.deleteTask, name="delete_task"),
    path('category/', views.category_list,name='categories')
]
