from django.urls import path, include
from django.contrib.auth.views import PasswordChangeView
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'accounts'

# Create router and register viewsets
router = DefaultRouter()
router.register(r'users', views.CustomUserViewSet, basename='user')
router.register(r'profiles', views.UserProfileViewSet, basename='profile') 
router.register(r'addresses', views.AddressViewSet, basename='address')
router.register(r'guest-users', views.GuestUserViewSet, basename='guest-user')

# Custom router methods for users
user_list = views.CustomUserViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

user_detail = views.CustomUserViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

# Custom router methods for profiles
profile_list = views.UserProfileViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

profile_detail = views.UserProfileViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update'
})

# Custom router methods for addresses
address_list = views.AddressViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

address_detail = views.AddressViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    # API endpoints using router
    path('api/', include(router.urls)),
    
    # Custom API endpoints
    path('api/users/', user_list, name='user-list'),
    path('api/users/<int:pk>/', user_detail, name='user-detail'),
    path('api/profiles/', profile_list, name='profile-list'),
    path('api/profiles/<int:pk>/', profile_detail, name='profile-detail'),
    path('api/addresses/', address_list, name='address-list'),
    path('api/addresses/<int:pk>/', address_detail, name='address-detail'),
    
    # Auth views
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('password-change/', PasswordChangeView.as_view(
        template_name='accounts/password_change.html'
    ), name='password_change'),

    # Profile views 
    path('profile/', views.profile_view, name='profile'),
    path('profile/update/', views.update_profile_view, name='update_profile'),

    # Address views
    path('addresses/', views.manage_addresses_view, name='manage_addresses'),
    path('addresses/add/', views.add_address_view, name='add_address'),
    path('addresses/update/<int:pk>/', views.update_address_view, name='update_address'),
    path('addresses/delete/<int:pk>/', views.delete_address_view, name='delete_address'),
]
