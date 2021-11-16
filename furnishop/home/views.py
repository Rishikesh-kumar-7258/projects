from django.http.response import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    param = {
        'cards' : list(range(1,21)),
    }
    return render(request, 'index.html', param)

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def services(request):
    return render(request, 'services.html')