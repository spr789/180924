from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from cart.models import cart
from django.shortcuts import get_object_or_404

class OrderListView(generics.ListCreateAPIView):
    """
    API view to list all orders for the authenticated user and create new orders.
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        cart_obj = get_object_or_404(cart, user=request.user, is_active=True)
        order_data = {
            'user': request.user.id,
            'cart': cart_obj.id,
            'shipping_address': request.data.get('shipping_address'),
            'billing_address': request.data.get('billing_address'),
            'shipping_method': request.data.get('shipping_method'),
            'total_amount': cart_obj.get_total_price(),
            'discount': request.data.get('discount', 0),
            'tax': request.data.get('tax', 0),
            'shipping_cost': request.data.get('shipping_cost', 0),
            'grand_total': request.data.get('grand_total')
        }
        serializer = self.get_serializer(data=order_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderDetailView(generics.RetrieveUpdateAPIView):
    """
    API view to retrieve, update, or delete an individual order.
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderItemListView(generics.ListCreateAPIView):
    """
    API view to list and add order items.
    """
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        order = get_object_or_404(Order, id=self.kwargs['order_id'], user=self.request.user)
        return OrderItem.objects.filter(order=order)

    def create(self, request, *args, **kwargs):
        order = get_object_or_404(Order, id=self.kwargs['order_id'], user=request.user)
        item_data = {
            'order': order.id,
            'product': request.data.get('product'),
            'quantity': request.data.get('quantity'),
            'price': request.data.get('price'),
            'total_price': request.data.get('total_price')
        }
        serializer = self.get_serializer(data=item_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderSuccessView(generics.RetrieveAPIView):
    """
    API view to return the details of a successful order.
    """
    serializer_class = OrderSerializer
    
