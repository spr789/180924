from django.db import models
from accounts.models import CustomUser, Address

class VendorProfile(models.Model):
    """
    VendorProfile model stores the vendor-specific information.
    This model is linked to the CustomUser model with a OneToOne relationship.
    """

    # Choices for verification status
    VERIFICATION_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Verified', 'Verified'),
        ('Rejected', 'Rejected'),
    ]

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='vendor_profile')
    business_name = models.CharField(max_length=255)
    business_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, related_name='business_address')
    website_url = models.URLField(blank=True, null=True)
    verification_status = models.CharField(max_length=50, choices=VERIFICATION_STATUS_CHOICES, default='Pending')
    verified_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.business_name


class VendorOrder(models.Model):
    """
    VendorOrder model to allow vendors to view and manage their orders.
    This links an Order to a specific Vendor, allowing the vendor to track the order status and details.
    """

    # Choices for order status
    ORDER_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
    ]

    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name='vendor_orders')
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, related_name='vendor_orders')
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=ORDER_STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Order {self.order.id} for {self.vendor.business_name}'


class VendorShipment(models.Model):
    """
    VendorShipment model to allow vendors to track shipments associated with their orders.
    """

    # Choices for shipment status
    SHIPMENT_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Transit', 'In Transit'),
        ('Delivered', 'Delivered'),
    ]

    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name='vendor_shipments')
    shipment = models.ForeignKey('shipping.Shipment', on_delete=models.CASCADE, related_name='vendor_shipments')
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE)
    shipped_date = models.DateTimeField(null=True, blank=True)
    delivery_date = models.DateTimeField(null=True, blank=True)
    tracking_number = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=50, choices=SHIPMENT_STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f'Shipment {self.shipment.id} for {self.vendor.business_name}'


class VendorAnalytics(models.Model):
    """
    VendorAnalytics model to track and provide insights into vendor performance.
    """
    vendor = models.OneToOneField(VendorProfile, on_delete=models.CASCADE, related_name='analytics')
    total_sales = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    total_orders = models.PositiveIntegerField(default=0)
    total_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Analytics for {self.vendor.business_name}'


class VendorPayout(models.Model):
    """
    VendorPayout model to manage the payouts to vendors.
    """

    # Choices for payout status
    PAYOUT_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Failed', 'Failed'),
    ]

    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name='payouts')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payout_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=PAYOUT_STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f'Payout of {self.amount} to {self.vendor.business_name} on {self.payout_date}'


class VendorNotification(models.Model):
    """
    VendorNotification model to store notifications specific to vendors.
    """
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name='notifications')
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f'Notification for {self.vendor.business_name}: {self.message}'
