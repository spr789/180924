from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'catalog'

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet, basename='category')
router.register(r'collections', views.CollectionViewSet, basename='collection')
router.register(r'admin/categories', views.CategoryManagementViewSet, basename='category-management')
router.register(r'admin/collections', views.CollectionManagementViewSet, basename='collection-management')

urlpatterns = router.urls

# Add additional URL patterns
urlpatterns += [
    path('api/', include(router.urls)),
]
