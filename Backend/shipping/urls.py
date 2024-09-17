from django.urls import path
from . import views

app_name = 'shipping'

urlpatterns = [
    path('methods/', views.shipping_methods_list, name='shipping_methods_list'),
    path('create/<int:order_id>/', views.create_shipment, name='create_shipment'),
    path('<int:shipment_id>/', views.shipment_detail, name='shipment_detail'),
    path('track/<str:tracking_number>/', views.track_shipment, name='track_shipment'),
]
