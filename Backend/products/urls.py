from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'products'

router = DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')  # Product images are handled via nested routes in ProductViewSet
router.register(r'vendor/products', views.VendorProductViewSet, basename='vendor-product')
router.register(r'reviews', views.ProductReviewViewSet, basename='product-review')

urlpatterns = router.urls

# Add additional URL patterns
urlpatterns += [
    path('api/', include(router.urls)),
]
