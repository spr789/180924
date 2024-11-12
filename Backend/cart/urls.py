from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'cart'

router = DefaultRouter()
router.register(r'carts', views.CartViewSet, basename='cart')

urlpatterns = router.urls

# Add additional URL patterns
urlpatterns = [
    path('', include(router.urls)),
]
