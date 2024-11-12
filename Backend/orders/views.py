from rest_framework import viewsets, permissions
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Order, OrderItem, OrderStatusHistory
from .serializers import OrderSerializer, OrderItemSerializer, OrderStatusHistorySerializer

class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing orders
    """
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Get orders for the authenticated user
        """
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        cart = get_object_or_404(cart, user=self.request.user, is_active=True)
        order = serializer.save(
            user=self.request.user,
            cart=cart,
            total_amount=cart.get_total_price(),
            grand_total=cart.get_total_price() + serializer.validated_data.get('shipping_cost', 0) - 
                       serializer.validated_data.get('discount', 0) + serializer.validated_data.get('tax', 0)
        )

        # Create order items from cart items
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.get_total_price(),
                total_price=item.get_total_price()
            )

        # Mark cart as inactive
        cart.is_active = False
        cart.save()

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """
        Cancel an order if it's pending or processed
        """
        order = self.get_object()
        if order.status in ['pending', 'processed']:
            order.status = 'canceled'
            order.save()

            OrderStatusHistory.objects.create(
                order=order,
                status='canceled',
                changed_by=request.user,
                notes='Order canceled by customer'
            )
            
            return Response({'status': 'Order canceled successfully'})
        return Response({'error': 'Order cannot be canceled'}, status=400)

class OrderItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet for order items
    """
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return OrderItem.objects.filter(order__user=self.request.user)

class OrderStatusHistoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for order status history
    """
    serializer_class = OrderStatusHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return OrderStatusHistory.objects.filter(order__user=self.request.user).order_by('-changed_at')
