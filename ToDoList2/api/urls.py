from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('taskList/', views.listView, name='task-list'),
    path('taskView/<str:pk>', views.taskView, name='task-view'),
    path('taskEdit/<str:pk>', views.taskEdit, name='task-edit')
]