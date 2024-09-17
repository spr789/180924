from django.urls import path
from django.contrib.auth.views import PasswordChangeView
from .views import register_view, login_view, logout_view, profile_view, update_profile_view, manage_addresses_view, add_address_view, update_address_view, delete_address_view

app_name = 'accounts'


urlpatterns = [
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('profile/', profile_view, name='profile'),
    path('profile/update/', update_profile_view, name='update_profile'),
    path('addresses/', manage_addresses_view, name='manage_addresses'),
    path('addresses/add/', add_address_view, name='add_address'),
    path('addresses/update/<int:pk>/', update_address_view, name='update_address'),
    path('addresses/delete/<int:pk>/', delete_address_view, name='delete_address'),
    path('password-change/', PasswordChangeView.as_view(template_name='accounts/password_change.html'), name='password_change'),
]
