from django.contrib import admin
from .models import Product, ProductImage, ProductReview, ProductSpecification, BulkUpload

# Admin for Product
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'vendor', 'category', 'original_price', 'discounted_price', 'stock', 'status', 'is_active', 'created_at')
    search_fields = ('name', 'vendor__business_name', 'sku', 'upc')
    list_filter = ('vendor', 'category', 'is_active', 'status')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['name']

# Admin for ProductImage
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'alt_text')
    search_fields = ('product__name',)
    list_filter = ('product',)

# Admin for ProductReview
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'customer', 'rating', 'created_at')
    search_fields = ('product__name', 'customer__email')
    list_filter = ('rating', 'created_at')

# Admin for ProductSpecification
class ProductSpecificationAdmin(admin.ModelAdmin):
    list_display = ('product', 'name', 'value')
    search_fields = ('product__name', 'name')
    list_filter = ('product',)

# Admin for BulkUpload
class BulkUploadAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'uploaded_at', 'processed', 'successful', 'processed_at')
    search_fields = ('vendor__business_name',)
    list_filter = ('processed', 'successful', 'uploaded_at')

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(ProductReview, ProductReviewAdmin)
admin.site.register(ProductSpecification, ProductSpecificationAdmin)
admin.site.register(BulkUpload, BulkUploadAdmin)
