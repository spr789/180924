from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import cart as CartModel, cartItem
from products.models import Product
from .serializers import CartSerializer, CartItemSerializer

class CartViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing shopping carts
    """
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Get cart for the authenticated user
        """
        return CartModel.objects.filter(user=self.request.user, is_active=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        """
        Add an item to the cart
        """
        cart = self.get_object()
        product = get_object_or_404(Product, id=request.data.get('product_id'))
        quantity = int(request.data.get('quantity', 1))

        cart_item, created = cartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        cart.last_activity = cart_item.updated_at
        cart.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def update_item(self, request, pk=None):
        """
        Update quantity of an item in the cart
        """
        cart = self.get_object()
        cart_item = get_object_or_404(cartItem, id=request.data.get('cart_item_id'), cart=cart)
        cart_item.quantity = int(request.data.get('quantity', cart_item.quantity))
        cart_item.save()

        cart.last_activity = cart_item.updated_at
        cart.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def remove_item(self, request, pk=None):
        """
        Remove an item from the cart
        """
        cart = self.get_object()
        cart_item = get_object_or_404(cartItem, id=request.data.get('cart_item_id'), cart=cart)
        cart_item.delete()

        cart.last_activity = cart_item.updated_at
        cart.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def checkout(self, request, pk=None):
        """
        Process checkout for the cart
        """
        cart = self.get_object()
        
        # Add checkout logic here
        # This would typically involve:
        # 1. Validating the cart
        # 2. Creating an order
        # 3. Processing payment
        # 4. Marking cart as inactive
        
        cart.is_active = False
        cart.save()
        
        return Response({'status': 'Checkout successful'})

class CartItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing cart items
    """
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Get cart items for the authenticated user's active cart
        """
        return cartItem.objects.filter(cart__user=self.request.user, cart__is_active=True)

    def perform_create(self, serializer):
        cart = get_object_or_404(CartModel, user=self.request.user, is_active=True)
        serializer.save(cart=cart)
