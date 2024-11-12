from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'orders'

router = DefaultRouter()
router.register(r'orders', views.OrderViewSet, basename='order')

urlpatterns = router.urls

# Add additional URL patterns
urlpatterns += [
    path('api/', include(router.urls)),
]
