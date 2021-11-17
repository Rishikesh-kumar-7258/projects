from django.shortcuts import redirect, render
from home.models import Contact

# Create your views here.
def index(request):
    param = {
        'cards' : list(range(1,21)),
    }
    return render(request, 'index.html', param)

def about(request):
    return render(request, 'about.html')

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        number = request.POSt.get('number')
        message = request.POST.get('message')

        contact = Contact(name=name, email=email, number=number, message=message)
        contact.save()

        redirect('/')
    return render(request, 'contact.html')

def services(request):
    return render(request, 'services.html')