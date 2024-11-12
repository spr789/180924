from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    VendorRegisterViewSet, VendorLoginViewSet, VendorProfileViewSet,
    VendorOrderViewSet, VendorShipmentViewSet, VendorPayoutViewSet,
    VendorNotificationViewSet, VendorAnalyticsViewSet
)

router = DefaultRouter()
router.register(r'vendor-register', VendorRegisterViewSet, basename='vendor-register')
router.register(r'vendor-login', VendorLoginViewSet, basename='vendor-login')
router.register(r'vendor-profile', VendorProfileViewSet, basename='vendor-profile')
router.register(r'vendor-orders', VendorOrderViewSet, basename='vendor-orders')
router.register(r'vendor-shipments', VendorShipmentViewSet, basename='vendor-shipments')
router.register(r'vendor-payouts', VendorPayoutViewSet, basename='vendor-payouts')
router.register(r'vendor-notifications', VendorNotificationViewSet, basename='vendor-notifications')
router.register(r'vendor-analytics', VendorAnalyticsViewSet, basename='vendor-analytics')

urlpatterns = [
    path('', include(router.urls)),
]
