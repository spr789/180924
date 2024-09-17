from django.db import models
from vendors.models import VendorProfile
from products.models import Product
from orders.models import Order

class warehouse(models.Model):
    """
    warehouse model represents a storage location for vendor products.
    """
    vendor = models.OneToOneField(VendorProfile, on_delete=models.CASCADE, related_name='warehouse')
    name = models.CharField(max_length=255)
    address = models.TextField()
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} - {self.vendor.business_name}'

class InventoryItem(models.Model):
    """
    InventoryItem model represents the stock of a specific product in a warehouse.
    """
    warehouse = models.ForeignKey(warehouse, on_delete=models.CASCADE, related_name='inventory')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventory_items')
    quantity = models.PositiveIntegerField(default=0)
    restock_threshold = models.PositiveIntegerField(default=10)  # Alert when stock falls below this
    restock_date = models.DateTimeField(blank=True, null=True)  # Expected restock date
    last_restocked = models.DateTimeField(blank=True, null=True)  # Last restock date
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.product.name} - {self.warehouse.name}'

    def is_below_threshold(self):
        return self.quantity <= self.restock_threshold

class Shipment(models.Model):
    """
    Shipment model represents an outgoing shipment of products from the warehouse.
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='shipments')
    warehouse = models.ForeignKey(warehouse, on_delete=models.CASCADE, related_name='shipments')
    shipped_at = models.DateTimeField(blank=True, null=True)
    delivered_at = models.DateTimeField(blank=True, null=True)
    tracking_number = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('failed', 'Failed'),
    ], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Shipment {self.tracking_number or self.id} - Order {self.order.order_number}'
