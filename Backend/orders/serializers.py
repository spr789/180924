from rest_framework import serializers
from .models import Order, OrderItem, OrderStatusHistory


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price', 'total_price']


class OrderStatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatusHistory
        fields = ['id', 'status', 'changed_at', 'changed_by', 'notes']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status_history = OrderStatusHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'order_number', 'cart', 'shipping_address', 'billing_address', 
            'shipping_method', 'payment', 'status', 'total_amount', 'discount', 'tax', 
            'shipping_cost', 'grand_total', 'order_notes', 'tracking_number', 'is_gift', 
            'gift_message', 'promotion_code', 'currency', 'order_source', 'created_at', 
            'updated_at', 'items', 'status_history'
        ]
