from rest_framework import viewsets, permissions
from .models import Category, Collection
from .serializers import CategorySerializer, CollectionSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for listing and retrieving categories.
    """
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Category.objects.filter(is_active=True).order_by('sort_order', 'name')

class CollectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for listing and retrieving collections.
    """
    serializer_class = CollectionSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Collection.objects.filter(is_active=True).order_by('sort_order', 'name')

class CategoryManagementViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing categories (CRUD operations).
    Requires authentication.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Category.objects.all().order_by('sort_order', 'name')

class CollectionManagementViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing collections (CRUD operations).
    Requires authentication.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CollectionSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Collection.objects.all().order_by('sort_order', 'name')
