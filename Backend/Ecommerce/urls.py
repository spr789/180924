from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', include('jet.urls', 'jet')),
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/catalog/', include('catalog.urls')),
    path('api/products/', include('products.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/shipping/', include('shipping.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/vendors/', include('vendors.urls')),
    path('api/wishlist/', include('wishlist.urls')),
    path('api/search/', include('search.urls')),  
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
