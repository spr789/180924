from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,)

urlpatterns = [
    path('accounts/', include('accounts.api_urls', namespace='accounts-api')),
    path('catalog/', include('catalog.api_urls', namespace='catalog-api')),
    path('products/', include('products.api_urls', namespace='products-api')),
    path('orders/', include('orders.api_urls', namespace='orders-api')),
    path('cart/', include('cart.api_urls', namespace='cart-api')),
    #path('shipping/', include('shipping.api_urls', namespace='shipping-api')),
    #path('payments/', include('payments.api_urls', namespace='payments-api')),
    #path('notifications/', include('notifications.api_urls', namespace='notifications-api')),
    #path('cms/', include('cms.api_urls', namespace='cms-api')),
    #path('analytics/', include('analytics.api_urls', namespace='analytics-api')),
    path('vendors/', include('vendors.api_urls', namespace='vendors-api')),
    #path('wishlist/', include('wishlist.api_urls', namespace='wishlist-api')),
    #path('search/', include('search.api_urls', namespace='search-api')),
    # Uncomment the following paths if API endpoints are needed:
    # path('reviews/', include('reviews.api_urls', namespace='reviews-api')),
    # path('support/', include('support.api_urls', namespace='support-api')),
    # path('discounts/', include('discounts.api_urls', namespace='discounts-api')),
    # path('affiliate/', include('affiliate.api_urls', namespace='affiliate-api')),
    # path('loyalty/', include('loyalty.api_urls', namespace='loyalty-api')),
    # path('marketing/', include('marketing.api_urls', namespace='marketing-api')),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
