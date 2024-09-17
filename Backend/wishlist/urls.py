from django.urls import path
from . import views

app_name = 'wishlist'

urlpatterns = [
    # Wishlist List
    path('', views.wishlist_list, name='wishlist_list'),

    # Wishlist Detail
    path('<int:wishlist_id>/', views.wishlist_detail, name='wishlist_detail'),

    # Add to Wishlist
    path('add/<int:product_id>/', views.add_to_wishlist, name='add_to_wishlist'),

    # Remove from Wishlist
    path('remove/<int:wishlist_item_id>/', views.remove_from_wishlist, name='remove_from_wishlist'),
]
