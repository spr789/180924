from django.urls import path
from .api import (
    VendorRegisterAPIView, VendorLoginAPIView, VendorProfileAPIView, 
    VendorOrdersAPIView, VendorShipmentsAPIView, VendorPayoutsAPIView, 
    VendorNotificationsAPIView, MarkNotificationAsReadAPIView, VendorAnalyticsAPIView
)

app_name = 'vendors-api'

urlpatterns = [
    path('register/', VendorRegisterAPIView.as_view(), name='vendor_register_api'),
    path('login/', VendorLoginAPIView.as_view(), name='vendor_login_api'),
    path('profile/', VendorProfileAPIView.as_view(), name='vendor_profile_api'),
    path('orders/', VendorOrdersAPIView.as_view(), name='vendor_orders_api'),
    path('shipments/', VendorShipmentsAPIView.as_view(), name='vendor_shipments_api'),
    path('payouts/', VendorPayoutsAPIView.as_view(), name='vendor_payouts_api'),
    path('notifications/', VendorNotificationsAPIView.as_view(), name='vendor_notifications_api'),
    path('notifications/<int:notification_id>/read/', MarkNotificationAsReadAPIView.as_view(), name='mark_notification_as_read_api'),
    path('analytics/', VendorAnalyticsAPIView.as_view(), name='vendor_analytics_api'),
]
