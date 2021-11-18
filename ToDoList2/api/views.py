from django.shortcuts import redirect, render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api import serializers

from api.models import Task

# Create your views here.
@api_view(['GET']) # used this method to convert it into an api
def apiOverview(request):
    urls = {
        'ListAdd' : 'taskAdd/',
        'ListView' : 'taskList/',
        'TaskView':'taskView/',
        'TaskEdit' : 'taskEdit/',
        'Delete' : 'taskDelete/'
    }
    return Response(urls)

@api_view(['GET'])
def listView(request):
    tasks = Task.objects.all()
    serializer = serializers.TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def taskView(request, pk):
    task = Task.objects.get(id=pk)
    serializer = serializers.TaskSerializer(task, many=False)

    return Response(serializer.data)

@api_view(['GET', 'POST'])
def taskEdit(request, pk):
    task = Task.objects.get(id=pk)
    serializer = serializers.TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()

    return redirect('/taskList/')


@api_view(['POST'])
def taskAdd(request):
    serializer = serializers.TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
