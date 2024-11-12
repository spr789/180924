from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'products'

router = DefaultRouter()
router.register(r'', views.ProductViewSet, basename='product')
router.register(r'reviews', views.ProductReviewViewSet, basename='product-review')
router.register(r'bulk-uploads', views.BulkUploadViewSet, basename='bulk-upload')

urlpatterns = [
    path('', include(router.urls)),  # This will handle all default CRUD routes for products, reviews, etc.
    path('products/<slug:slug>/add-image/', views.ProductViewSet.as_view({'post': 'add_image'}), name='product-add-image'),
    path('products/<slug:slug>/remove-image/', views.ProductViewSet.as_view({'delete': 'remove_image'}), name='product-remove-image'),
]
