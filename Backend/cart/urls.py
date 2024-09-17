from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('', views.cart_view, name='cart_view'),
    path('add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('update/<int:cart_item_id>/', views.update_cart_item, name='update_cart_item'),
    path('remove/<int:cart_item_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('checkout/', views.checkout_view, name='checkout_view'),
    path('buy-now/<int:product_id>/', views.buy_now, name='buy_now'),  # Added buy now URL
    path('abandoned-cart-reminder/', views.abandoned_cart_reminder, name='abandoned_cart_reminder'),
]
