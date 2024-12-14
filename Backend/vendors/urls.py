from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router instance
router = DefaultRouter()

# Register viewsets with appropriate basenames
#router.register(r'register', views.VendorRegisterViewSet, basename='vendor-register')
router.register(r'login', views.VendorLoginViewSet, basename='vendor-login')
router.register(r'profile', views.VendorProfileViewSet, basename='vendor-profile')
router.register(r'orders', views.VendorOrderViewSet, basename='vendor-orders')
router.register(r'shipments', views.VendorShipmentViewSet, basename='vendor-shipments')
router.register(r'payouts', views.VendorPayoutViewSet, basename='vendor-payouts')
router.register(r'notifications', views.VendorNotificationViewSet, basename='vendor-notifications')
router.register(r'analytics', views.VendorAnalyticsViewSet, basename='vendor-analytics')

# Define urlpatterns
urlpatterns = [
    path('', include(router.urls)),
]
