from django.urls import path
from .api import CartAPIView, AddToCartAPIView, UpdateCartItemAPIView, RemoveCartItemAPIView, CheckoutAPIView

app_name = 'cart-api'


urlpatterns = [
    path('cart/', CartAPIView.as_view(), name='cart'),
    path('cart/add/<int:product_id>/', AddToCartAPIView.as_view(), name='add_to_cart'),
    path('cart/update/<int:item_id>/', UpdateCartItemAPIView.as_view(), name='update_cart_item'),
    path('cart/remove/<int:item_id>/', RemoveCartItemAPIView.as_view(), name='remove_cart_item'),
    path('checkout/', CheckoutAPIView.as_view(), name='checkout'),
]
