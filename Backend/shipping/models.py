from django.db import models
from django.apps import apps
from vendors.models import VendorProfile
from products.models import Product

class Shipment(models.Model):
    """
    Shipment model represents the shipment details for an order.
    """
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name='shipments')
    shipping_method = models.ForeignKey('ShippingMethod', on_delete=models.SET_NULL, null=True)
    tracking_number = models.CharField(max_length=100, blank=True, null=True)
    shipped_at = models.DateTimeField(blank=True, null=True)
    delivered_at = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('in_transit', 'In Transit'),
        ('delivered', 'Delivered'),
        ('failed', 'Failed'),
    ], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_order(self):
        Order = apps.get_model('orders', 'Order')
        return Order.objects.get(pk=self.order_id)

    def __str__(self):
        return f'Shipment {self.tracking_number or "No Tracking"} for Order {self.get_order().order_number}'

class ShippingMethod(models.Model):
    """
    ShippingMethod model represents different shipping options available for an order.
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    estimated_delivery_time = models.CharField(max_length=50, blank=True, null=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class ShippingRate(models.Model):
    """
    ShippingRate model stores the shipping cost for different combinations of origin and destination.
    """
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name='shipping_rates')
    shipping_method = models.ForeignKey(ShippingMethod, on_delete=models.CASCADE, related_name='shipping_rates')
    origin_country = models.CharField(max_length=100)
    destination_country = models.CharField(max_length=100)
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_time = models.CharField(max_length=50, blank=True, null=True)  # Delivery time specific to this route

    def __str__(self):
        return f'{self.shipping_method.name} from {self.origin_country} to {self.destination_country} - Rate: {self.rate}'

class ShipmentItem(models.Model):
    """
    ShipmentItem model represents individual items in a shipment.
    """
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    dimensions = models.CharField(max_length=100, blank=True, null=True)  # e.g., "30x20x10 cm"

    def __str__(self):
        return f'{self.product.name} in shipment {self.shipment.tracking_number or "No Tracking"}'
