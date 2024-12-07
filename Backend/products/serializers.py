from rest_framework import serializers
from .models import Product, ProductImage, ProductReview, BulkUpload
from catalog.models import Category, Collection
from tag.models import Tag

# Serializer for Product Image
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text']

# Serializer for Product
class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False)
    collections = serializers.PrimaryKeyRelatedField(many=True, queryset=Collection.objects.all(), required=False)
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all(), required=False)
    
    class Meta:
        model = Product
        fields = [
            'id', 'vendor', 'name', 'slug', 'description', 'brand',
            'original_price', 'discounted_price', 'discount_start_date',
            'discount_end_date', 'category', 'collections', 'tags',
            'stock', 'sku', 'upc', 'weight', 'dimensions', 'condition',
            'shipping_cost', 'free_shipping', 'is_digital', 'backorder',
            'low_stock_threshold', 'warranty_period', 'returnable',
            'is_active', 'status', 'average_rating', 'rating_count',
            'available_from', 'available_until', 'created_at', 'updated_at',
            'images'
        ]
        read_only_fields = ['slug', 'average_rating', 'rating_count']

# Serializer for Product Review  
class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = ['id', 'product', 'customer', 'rating', 'comment', 'created_at']
        read_only_fields = ['created_at']

# Serializer for Bulk Upload
class BulkUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = BulkUpload
        fields = ['id', 'vendor', 'file', 'uploaded_at', 'processed', 
                 'successful', 'processed_at', 'error_message']
        read_only_fields = ['uploaded_at', 'processed', 'successful', 
                           'processed_at', 'error_message']
