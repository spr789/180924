from django.conf import settings
from django.db import models
from vendors.models import VendorProfile
from products.models import Product
from orders.models import Order
from django.utils import timezone

class UserActivity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='analytics_activities')
    session_id = models.CharField(max_length=255, blank=True, null=True)
    activity_type = models.CharField(max_length=100, choices=[
        ('view_product', 'View Product'),
        ('add_to_cart', 'Add to cart'),
        ('remove_from_cart', 'Remove from cart'),
        ('checkout', 'Checkout'),
        ('login', 'Login'),
        ('logout', 'Logout'),
        ('search', 'Search'),
    ])
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True, related_name='activity_product')
    timestamp = models.DateTimeField(auto_now_add=True)
    extra_data = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f'{self.user.email if self.user else "Guest"} - {self.activity_type} at {self.timestamp}'

class ProductView(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='views')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='viewed_products')
    session_id = models.CharField(max_length=255, blank=True, null=True)
    viewed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.email if self.user else "Guest"} viewed {self.product.name}'

class SalesData(models.Model):
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name='sales_data')
    total_sales = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_orders = models.PositiveIntegerField(default=0)
    total_revenue = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_discounts = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_refunds = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    start_date = models.DateField()
    end_date = models.DateField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Sales Data for {self.vendor.business_name} from {self.start_date} to {self.end_date}'

class SearchAnalytics(models.Model):
    query = models.CharField(max_length=255)
    total_results = models.PositiveIntegerField(default=0)
    search_count = models.PositiveIntegerField(default=0)
    last_searched_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Search Query: "{self.query}" - Results: {self.total_results}'

class TrafficData(models.Model):
    date = models.DateField()
    page_views = models.PositiveIntegerField(default=0)
    unique_visitors = models.PositiveIntegerField(default=0)
    orders_placed = models.PositiveIntegerField(default=0)
    revenue_generated = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f'Traffic Data for {self.date}'

class VendorPerformance(models.Model):
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name='performance_data')
    average_order_value = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    conversion_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    return_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    average_shipping_time = models.DurationField(blank=True, null=True)
    feedback_score = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_reviews = models.PositiveIntegerField(default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Performance Data for {self.vendor.business_name} from {self.start_date} to {self.end_date}'

class RealTimeAnalytics(models.Model):
    metric_name = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Real-time metric: {self.metric_name} - {self.value} at {self.timestamp}'

class Alert(models.Model):
    metric_name = models.CharField(max_length=255)
    condition = models.CharField(max_length=255, help_text="Condition for triggering the alert, e.g., '>', '<', '==', etc.")
    threshold = models.DecimalField(max_digits=10, decimal_places=2)
    triggered_at = models.DateTimeField(blank=True, null=True)
    is_triggered = models.BooleanField(default=False)

    def __str__(self):
        return f'Alert: {self.metric_name} {self.condition} {self.threshold}'

    def check_condition(self, current_value):
        if self.condition == '>' and current_value > self.threshold:
            self.is_triggered = True
            self.triggered_at = timezone.now()
        elif self.condition == '<' and current_value < self.threshold:
            self.is_triggered = True
            self.triggered_at = timezone.now()
        elif self.condition == '==' and current_value == self.threshold:
            self.is_triggered = True
            self.triggered_at = timezone.now()
        self.save()

class DataExport(models.Model):
    export_type = models.CharField(max_length=50, choices=[
        ('csv', 'CSV'),
        ('excel', 'Excel'),
        ('pdf', 'PDF'),
    ])
    file_path = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    requested_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='data_exports')

    def __str__(self):
        return f'{self.export_type} export by {self.requested_by.email if self.requested_by else "Unknown"} on {self.created_at}'

class CustomReport(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    report_criteria = models.JSONField(help_text="Criteria for generating the report, stored as JSON")
    generated_at = models.DateTimeField(auto_now_add=True)
    generated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='custom_reports')
    file_path = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f'Custom Report: {self.name} generated by {self.generated_by.email if self.generated_by else "Unknown"} on {self.generated_at}'
