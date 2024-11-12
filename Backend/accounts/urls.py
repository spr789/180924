from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'accounts'

# Create router and register viewsets
router = DefaultRouter()
router.register(r'users', views.CustomUserViewSet, basename='user')
router.register(r'profiles', views.UserProfileViewSet, basename='profile')
router.register(r'addresses', views.AddressViewSet, basename='address')
router.register(r'guest-users', views.GuestUserViewSet, basename='guest-user')

urlpatterns = [
    # Standard CRUD API endpoints via router
    path('api/', include(router.urls)),
]
