from django.urls import path
from . import views

app_name = 'vendors'

urlpatterns = [
    path('register/', views.VendorRegisterView.as_view(), name='vendor_register'),
    path('login/', views.VendorLoginView.as_view(), name='vendor_login'),
    path('dashboard/', views.vendor_dashboard, name='vendor_dashboard'),
    path('profile/', views.vendor_profile, name='vendor_profile'),
    path('orders/', views.vendor_orders, name='vendor_orders'),
    path('orders/<int:order_id>/', views.vendor_order_detail, name='vendor_order_detail'),
    path('shipments/', views.vendor_shipments, name='vendor_shipments'),
    path('payouts/', views.vendor_payouts, name='vendor_payouts'),
    path('notifications/', views.vendor_notifications, name='vendor_notifications'),
    path('notifications/<int:notification_id>/read/', views.mark_notification_as_read, name='mark_notification_as_read'),
]
