from django.urls import path
from . import views

app_name = 'payments'

urlpatterns = [
    path('methods/', views.payment_methods_list, name='payment_methods_list'),
    path('make/<int:order_id>/', views.make_payment, name='make_payment'),
    path('<int:payment_id>/', views.payment_detail, name='payment_detail'),
    path('refund/<int:payment_id>/', views.request_refund, name='request_refund'),
]
