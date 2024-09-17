from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import cart as CartModel, cartItem
from .serializers import CartSerializer, CartItemSerializer, CheckoutSerializer
from products.models import Product
from django.shortcuts import get_object_or_404

class CartAPIView(APIView):
    """
    API view to retrieve the current user's cart.
    """
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user_cart, created = CartModel.objects.get_or_create(user=request.user, is_active=True)
        else:
            session_id = request.session.session_key
            if not session_id:
                request.session.create()
                session_id = request.session.session_key
            user_cart, created = CartModel.objects.get_or_create(session_id=session_id, is_active=True)

        items = user_cart.items.all()
        cart_data = CartSerializer(user_cart).data
        cart_data['items'] = CartItemSerializer(items, many=True).data
        return Response(cart_data, status=status.HTTP_200_OK)


class AddToCartAPIView(APIView):
    """
    API view to add a product to the cart.
    """
    def post(self, request, product_id, *args, **kwargs):
        product = get_object_or_404(Product, id=product_id)
        quantity = request.data.get('quantity', 1)
        
        if request.user.is_authenticated:
            user_cart, created = CartModel.objects.get_or_create(user=request.user, is_active=True)
        else:
            session_id = request.session.session_key
            if not session_id:
                request.session.create()
                session_id = request.session.session_key
            user_cart, created = CartModel.objects.get_or_create(session_id=session_id, is_active=True)

        cart_item, item_created = cartItem.objects.get_or_create(cart=user_cart, product=product)
        cart_item.quantity += int(quantity)
        cart_item.save()

        return Response({"message": "Item added to cart"}, status=status.HTTP_200_OK)


class UpdateCartItemAPIView(APIView):
    """
    API view to update the quantity of a cart item.
    """
    def post(self, request, item_id, *args, **kwargs):
        cart_item = get_object_or_404(cartItem, id=item_id)
        quantity = request.data.get('quantity', cart_item.quantity)
        
        cart_item.quantity = int(quantity)
        cart_item.save()

        return Response({"message": "Item quantity updated"}, status=status.HTTP_200_OK)


class RemoveCartItemAPIView(APIView):
    """
    API view to remove a cart item.
    """
    def post(self, request, item_id, *args, **kwargs):
        cart_item = get_object_or_404(cartItem, id=item_id)
        cart_item.delete()

        return Response({"message": "Item removed from cart"}, status=status.HTTP_200_OK)


class CheckoutAPIView(APIView):
    """
    API view for the checkout process.
    """
    def post(self, request, *args, **kwargs):
        serializer = CheckoutSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()
            return Response({"message": "Checkout completed", "order_id": order.id}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
