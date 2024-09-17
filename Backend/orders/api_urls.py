from django.urls import path
from . import api

app_name = 'orders-api'

urlpatterns = [
    path('orders/', api.OrderListView.as_view(), name='order-list'),
    path('orders/<int:pk>/', api.OrderDetailView.as_view(), name='order-detail'),
    path('orders/<int:order_id>/items/', api.OrderItemListView.as_view(), name='order-item-list'),
    path('orders/order/success/<int:pk>/', api.OrderSuccessView.as_view(), name='order-success'),
]
