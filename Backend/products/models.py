from django.db import models
from catalog.models import Category, Collection
from tag.models import Tag
from django.utils.text import slugify

class Product(models.Model):
    """
    Product model represents individual items available for purchase.
    Linked to categories, collections, and vendors.
    The product's visibility on the website depends on staff approval.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending Approval'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    vendor = models.ForeignKey('vendors.VendorProfile', on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    brand = models.CharField(max_length=255, blank=True, null=True)
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    discount_start_date = models.DateTimeField(blank=True, null=True)
    discount_end_date = models.DateTimeField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    collections = models.ManyToManyField(Collection, related_name='products', blank=True)
    tags = models.ManyToManyField('tag.Tag', related_name='products', blank=True) 
    stock = models.PositiveIntegerField(default=0)
    sku = models.CharField(max_length=50, unique=True)
    upc = models.CharField(max_length=12, unique=True, blank=True, null=True)  # Universal Product Code
    weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    dimensions = models.CharField(max_length=255, blank=True, null=True)  # e.g., "30x20x10 cm"
    condition = models.CharField(max_length=50, blank=True, null=True)  # e.g., "New", "Used", "Refurbished"
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    free_shipping = models.BooleanField(default=False)
    is_digital = models.BooleanField(default=False)
    backorder = models.BooleanField(default=False)
    low_stock_threshold = models.PositiveIntegerField(default=0)
    warranty_period = models.CharField(max_length=50, blank=True, null=True)  # e.g., "1 Year"
    returnable = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    rating_count = models.PositiveIntegerField(default=0)
    available_from = models.DateTimeField(blank=True, null=True)
    available_until = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_vendor_profile(self):
        from vendors.models import VendorProfile
        return VendorProfile.objects.get(id=self.vendor_id)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
    
    def save(self, *args, **kwargs):
        # Automatically generate slug if not present
        if not self.slug:
            self.slug = slugify(self.name)
        
        # Automatically assign SKU if not provided
        if not self.sku:
            self.sku = f"{slugify(self.name)}-{self.id if self.id else 'new'}"
        
        super().save(*args, **kwargs)
        
        # Reassign SKU with the actual product ID after saving for the first time
        if 'new' in self.sku:
            self.sku = f"{slugify(self.name)}-{self.id}"
            super().save(update_fields=['sku'])

class ProductImage(models.Model):
    """
    ProductImage model to store images associated with a product.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='assets/images/products/')  # Updated path for image upload
    alt_text = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Image for {self.product.name}"


class ProductReview(models.Model):
    """
    ProductReview model allows customers to leave reviews for products.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    customer = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField()  # Rating out of 5
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.product.name} by {self.customer.email}"

class ProductSpecification(models.Model):
    """
    ProductSpecification model to define key specifications for a product.
    This can include attributes like color, size, weight, etc.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='specifications')
    name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}: {self.value} for {self.product.name}"

class BulkUpload(models.Model):
    """
    BulkUpload model to track bulk uploads of products by vendors.
    """
    vendor = models.ForeignKey('vendors.VendorProfile', on_delete=models.CASCADE, related_name='bulk_uploads')
    file = models.FileField(upload_to='bulk_uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    processed = models.BooleanField(default=False)
    successful = models.BooleanField(default=False)
    processed_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Bulk upload by {self.vendor.business_name} on {self.uploaded_at}"

