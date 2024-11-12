from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Product, ProductImage, ProductReview, BulkUpload
from .serializers import ProductSerializer, ProductImageSerializer, ProductReviewSerializer, BulkUploadSerializer
from django.utils.text import slugify
from django.db import IntegrityError

class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing products.
    """
    queryset = Product.objects.filter(is_active=True, status='approved')
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        """
        Optionally restricts the returned products by filtering against
        query parameters in the URL.
        """
        queryset = Product.objects.filter(is_active=True, status='approved')
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__slug=category)
        return queryset.order_by('name')

    @action(detail=True, methods=['post'])
    def add_image(self, request, slug=None):
        """
        Add an image to a product
        """
        product = self.get_object()
        serializer = ProductImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VendorProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for vendors to manage their products
    """
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'slug'

    def get_queryset(self):
        """
        Get products for the authenticated vendor
        """
        return Product.objects.filter(vendor=self.request.user.vendor_profile)

    def perform_create(self, serializer):
        # Generate unique slug
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
    ViewSet for product reviews
    """
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

class BulkUploadViewSet(viewsets.ModelViewSet):
    """
    ViewSet for bulk uploading products
    """
    queryset = BulkUpload.objects.all()
    serializer_class = BulkUploadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BulkUpload.objects.filter(vendor=self.request.user.vendor_profile)

    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user.vendor_profile)
