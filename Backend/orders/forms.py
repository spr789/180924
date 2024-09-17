from django import forms
from .models import Order, OrderItem, OrderStatusHistory

# Order form
class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = [
            'user', 'order_number', 'cart', 'shipping_address', 'billing_address', 'payment', 'shipping_method',
            'status', 'total_amount', 'discount', 'tax', 'shipping_cost', 'grand_total',
            'order_notes', 'tracking_number', 'is_gift', 'gift_message', 'promotion_code', 'currency', 'order_source'
        ]

# OrderItem form
class OrderItemForm(forms.ModelForm):
    class Meta:
        model = OrderItem
        fields = ['order', 'product', 'quantity', 'price', 'total_price']

# OrderStatusHistory form
class OrderStatusHistoryForm(forms.ModelForm):
    class Meta:
        model = OrderStatusHistory
        fields = ['order', 'status', 'changed_by', 'notes']
