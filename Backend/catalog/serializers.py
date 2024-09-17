from rest_framework import serializers
from .models import Category, Collection

# Serializer for the Category model
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'parent', 'image', 'meta_title', 'meta_description', 'meta_keywords', 'sort_order', 'is_active']

    # Custom method to automatically generate slug if not provided
    def validate(self, data):
        if not data.get('slug'):
            data['slug'] = slugify(data.get('name'))
        return data

# Serializer for the Collection model
class CollectionSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = ['id', 'name', 'slug', 'description', 'categories', 'image', 'meta_title', 'meta_description', 'meta_keywords', 'sort_order', 'is_active']

    # Custom method to automatically generate slug if not provided
    def validate(self, data):
        if not data.get('slug'):
            data['slug'] = slugify(data.get('name'))
        return data
