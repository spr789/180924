from django.urls import path
from . import views

app_name = 'support'

urlpatterns = [
    path('contact/', views.support_contact_view, name='support_contact'),
    path('faq/', views.support_faq_view, name='support_faq'),
    path('ticket/', views.support_ticket_view, name='support_ticket'),
]

