from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'accounts'

# Create router and register standard CRUD viewsets
router = DefaultRouter()
router.register(r'users', views.CustomUserViewSet, basename='user')
router.register(r'profiles', views.UserProfileViewSet, basename='profile')
router.register(r'addresses', views.AddressViewSet, basename='address')
router.register(r'guest-users', views.GuestUserViewSet, basename='guest-user')

urlpatterns = [
    # Include all routes managed by the router
    path('', include(router.urls)),

    # Separate paths for non-CRUD actions like login and register
    path('register/', views.RegisterViewSet.as_view({'post': 'create'}), name='register'),  # Updated to use RegisterViewSet
    path('login/', views.LoginViewSet.as_view({'post': 'create'}), name='login'),  # Updated to use LoginViewSet
]
