from rest_framework import serializers
from .models import Product, ProductImage, ProductReview, BulkUpload

# Serializer for Product Image
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text']

# Serializer for Product
class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)  # Include images

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'original_price', 
            'discounted_price', 'category', 'collections', 'tags', 
            'stock', 'sku', 'upc', 'weight', 'dimensions', 'is_active', 
            'created_at', 'updated_at', 'images'  # Add images field
        ]

# Serializer for Product Review
class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = ['id', 'product', 'customer', 'rating', 'comment', 'created_at']

# Serializer for Bulk Upload
class BulkUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = BulkUpload
        fields = ['id', 'vendor', 'file', 'uploaded_at', 'processed', 'successful', 'processed_at', 'error_message']
