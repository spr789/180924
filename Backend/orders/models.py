from django.db import models
from accounts.models import CustomUser, Address
from products.models import Product
from django.apps import apps
from shipping.models import ShippingMethod
from cart.models import cart
import random
import string
from shipping.models import ShippingMethod
from decimal import Decimal


class Order(models.Model):
    """
    Order model stores the details of an order placed by a customer.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processed', 'Processed'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('canceled', 'Canceled'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    order_number = models.CharField(max_length=20, unique=True)
    cart = models.ForeignKey(cart, on_delete=models.SET_NULL, null=True, blank=True)
    shipping_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True, related_name='shipping_orders')
    billing_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True, related_name='billing_orders')
    shipping_method = models.ForeignKey(ShippingMethod, on_delete=models.SET_NULL, null=True, blank=True)
    payment = models.ForeignKey('payments.Payment', on_delete=models.SET_NULL, null=True, blank=True, related_name='order_payments')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2)
    order_notes = models.TextField(blank=True, null=True)
    tracking_number = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_gift = models.BooleanField(default=False)
    gift_message = models.TextField(blank=True, null=True)
    promotion_code = models.CharField(max_length=50, blank=True, null=True)
    currency = models.CharField(max_length=10, default='USD')
    order_source = models.CharField(max_length=50, default='web')  # e.g., web, mobile app

    def __str__(self):
        return f'Order {self.order_number} by {self.user.email if self.user else "Guest"}'

    def generate_order_number(self):
        """
        Generates a unique order number using a combination of user ID and a random string.
        """
        user_id_str = str(self.user.id if self.user else '0')
        random_string = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        return f"{user_id_str}-{random_string}"

    def get_total_amount(self):
    
        if self.cart:
            return sum(item.get_total_price() for item in self.cart.items.all())
        return 0.00


    def get_shipments(self):
        """
        Retrieves all shipments associated with the order.
        """
        Shipment = apps.get_model('shipping', 'Shipment')
        return Shipment.objects.filter(order=self)

    def save(self, *args, **kwargs):
        """
        Overriding the save method to automatically generate the order number and calculate the grand total.
        """
        if not self.order_number:
            self.order_number = self.generate_order_number()
        self.total_amount = Decimal(self.total_amount)
        self.tax = Decimal(self.tax)
        self.shipping_cost = Decimal(self.shipping_cost)
        self.discount = Decimal(self.discount)
        
        self.grand_total = self.total_amount + self.tax + self.shipping_cost - self.discount
        
        super().save(*args, **kwargs)



class OrderItem(models.Model):
    """
    OrderItem model stores individual products in an order.
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.product.name if self.product else "Unknown Product"} in order {self.order.order_number}'

    def get_total_price(self):
        return self.price * self.quantity

class OrderStatusHistory(models.Model):
    """
    OrderStatusHistory model tracks the status changes of an order.
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='status_history')
    status = models.CharField(max_length=20, choices=Order.STATUS_CHOICES)
    changed_at = models.DateTimeField(auto_now_add=True)
    changed_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='status_changes')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'Order {self.order.order_number} status changed to {self.status} on {self.changed_at}'
