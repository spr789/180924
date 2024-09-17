from django.urls import path
from .api import ProductListCreateAPIView, ProductDetailAPIView, ProductImageCreateAPIView, ProductReviewListCreateAPIView, BulkUploadProductsAPIView

app_name = 'products-api'

urlpatterns = [
    # Product APIs
    path('products/', ProductListCreateAPIView.as_view(), name='product_list_create'),
    path('products/<slug:slug>/', ProductDetailAPIView.as_view(), name='product_detail'),

    # Product Image API
    path('products/add-image/<int:product_id>/', ProductImageCreateAPIView.as_view(), name='add_product_image'),

    # Product Review APIs
    path('products/<int:product_id>/reviews/', ProductReviewListCreateAPIView.as_view(), name='product_reviews'),

    # Bulk Upload Products API
    path('products/bulk-upload/', BulkUploadProductsAPIView.as_view(), name='bulk_upload_products'),
]
