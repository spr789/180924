from rest_framework import viewsets, permissions, status, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.utils.text import slugify
from django.db import IntegrityError
from .models import Product, ProductImage, ProductReview, BulkUpload
from .serializers import ProductSerializer, ProductImageSerializer, ProductReviewSerializer, BulkUploadSerializer
from rest_framework.permissions import AllowAny

class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing products.
    Provides CRUD operations and custom filtering.
    """
    queryset = Product.objects.filter(is_active=True, status='approved')
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'brand', 'sku']
    ordering_fields = ['name', 'created_at', 'original_price', 'stock']
    ordering = ['name']
    permission_classes = [AllowAny]  # Allow public access to products


    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True, status='approved')
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
            
        # Filter by collection
        collection = self.request.query_params.get('collection')
        if collection:
            queryset = queryset.filter(collections__slug=collection)
            
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(original_price__gte=min_price)
        if max_price:
            queryset = queryset.filter(original_price__lte=max_price)
            
        # Filter by availability
        in_stock = self.request.query_params.get('in_stock')
        if in_stock:
            queryset = queryset.filter(stock__gt=0)
            
        return queryset

    @action(detail=True, methods=['post'])
    def add_image(self, request, slug=None):
        """Add an image to a product"""
        product = self.get_object()
        serializer = ProductImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def remove_image(self, request, slug=None):
        """Remove an image from a product"""
        product = self.get_object()
        image_id = request.data.get('image_id')
        if image_id:
            try:
                image = ProductImage.objects.get(id=image_id, product=product)
                image.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except ProductImage.DoesNotExist:
                return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'Image ID required'}, status=status.HTTP_400_BAD_REQUEST)

class VendorProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for vendors to manage their products.
    Provides CRUD operations for vendor's products.
    """
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'sku']
    ordering_fields = ['created_at', 'status', 'stock']

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user.vendor_profile)

    def perform_create(self, serializer):
        name = self.request.data.get('name')
        slug = slugify(name)
        count = 0
        while Product.objects.filter(slug=slug).exists():
            count += 1
            slug = f"{slugify(name)}-{count}"
            
        serializer.save(
            vendor=self.request.user.vendor_profile,
            slug=slug,
            status='pending',
            average_rating=0.0,
            rating_count=0
        )

class ProductReviewViewSet(viewsets.ModelViewSet):
    """
    ViewSet for product reviews.
    Allows customers to create, read, update and delete their reviews.
    """
    serializer_class = ProductReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'rating']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = ProductReview.objects.all()
        product_slug = self.request.query_params.get('product')
        if product_slug:
            queryset = queryset.filter(product__slug=product_slug)
        return queryset

    def perform_create(self, serializer):
        # Check if user already reviewed this product
        product = serializer.validated_data['product']
        if ProductReview.objects.filter(customer=self.request.user, product=product).exists():
            raise serializers.ValidationError("You have already reviewed this product")
        serializer.save(customer=self.request.user)

class BulkUploadViewSet(viewsets.ModelViewSet):
    """
    ViewSet for bulk uploading products.
    Allows vendors to upload multiple products via CSV/Excel files.
    """
    serializer_class = BulkUploadSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['uploaded_at', 'processed_at']
    ordering = ['-uploaded_at']

    def get_queryset(self):
        return BulkUpload.objects.filter(vendor=self.request.user.vendor_profile)

    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user.vendor_profile)
