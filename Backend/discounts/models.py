from django.db import models
from vendors.models import VendorProfile
from products.models import Product, Category
from accounts.models import CustomUser

class Discount(models.Model):
    """
    Discount model represents a discount or promotion applied to products, categories, or the entire order.
    """
    DISCOUNT_TYPE_CHOICES = [
        ('percentage', 'Percentage'),
        ('fixed_amount', 'Fixed Amount'),
        ('free_shipping', 'Free shipping'),
    ]

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True, blank=True, null=True)  # Optional discount code
    description = models.TextField(blank=True, null=True)
    discount_type = models.CharField(max_length=20, choices=DISCOUNT_TYPE_CHOICES)
    value = models.DecimalField(max_digits=10, decimal_places=2, help_text="Value of the discount (percentage or fixed amount)")
    minimum_order_value = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="Minimum order value required to apply the discount")
    max_uses = models.PositiveIntegerField(default=1, help_text="Maximum number of times the discount can be used")
    used_count = models.PositiveIntegerField(default=0, help_text="Number of times the discount has been used")
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, null=True, blank=True, related_name='discounts')
    applicable_to = models.ManyToManyField(Product, blank=True, related_name='discounts', help_text="Specific products the discount applies to")
    applicable_categories = models.ManyToManyField(Category, blank=True, related_name='discounts', help_text="Specific categories the discount applies to")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} ({self.code or "No Code"}) - {self.discount_type}'

    def is_valid(self):
        """
        Checks if the discount is currently valid based on the date range and usage limits.
        """
        return self.is_active and self.valid_from <= timezone.now() <= self.valid_until and self.used_count < self.max_uses

class DiscountUsage(models.Model):
    """
    DiscountUsage model tracks the usage of discounts by customers.
    """
    discount = models.ForeignKey(Discount, on_delete=models.CASCADE, related_name='usages')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='discount_usages')
    order_id = models.CharField(max_length=50, null=True, blank=True, help_text="Order ID where the discount was applied")
    used_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.email} used {self.discount.name} on Order {self.order_id}'
