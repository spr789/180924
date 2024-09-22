from django.urls import path
from . import api_views

app_name = 'accounts-api'

urlpatterns = [
    path('register/', api_views.RegisterAPIView.as_view(), name='api-register'),
    path('login/', api_views.LoginAPIView.as_view(), name='api-login'),
    path('logout/', api_views.LogoutAPIView.as_view(), name='api-logout'),
    path('profile/', api_views.UserProfileAPIView.as_view(), name='api-profile'),
    path('profile/update/', api_views.UpdateProfileAPIView.as_view(), name='api-update-profile'),
    path('addresses/', api_views.ManageAddressesAPIView.as_view(), name='api-manage-addresses'),
    path('addresses/add/', api_views.AddAddressAPIView.as_view(), name='api-add-address'),
    path('addresses/update/<int:pk>/', api_views.UpdateAddressAPIView.as_view(), name='api-update-address'),
    path('addresses/delete/<int:pk>/', api_views.DeleteAddressAPIView.as_view(), name='api-delete-address'),
]
