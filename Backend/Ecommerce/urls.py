from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from cms.views import home_view  # Import the home_view


urlpatterns = [
    path('jet/', include('jet.urls', 'jet')),  # Django JET URLS
    path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')), 
    path('admin', admin.site.urls),
    path('', home_view, name='home'),  # Add this line for the homepage
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('catalog/', include('catalog.urls', namespace='catalog')),
    path('products/', include('products.urls', namespace='products')),
    path('orders/', include('orders.urls', namespace='orders')),
    path('cart/', include('cart.urls', namespace='cart')),
    path('shipping/', include('shipping.urls', namespace='shipping')),
    path('payments/', include('payments.urls', namespace='payments')),
    path('notifications/', include('notifications.urls', namespace='notifications')),
    path('cms', include('cms.urls', namespace='cms')),
    path('analytics/', include('analytics.urls', namespace='analytics')),
    path('vendors/', include('vendors.urls', namespace='vendors')),
    path('wishlist/', include('wishlist.urls', namespace='wishlist')),
    path('search/', include('search.urls', namespace='search')),
    # Uncomment the following paths if needed
    # path('reviews/', include('reviews.urls', namespace='reviews')),
    # path('support/', include('support.urls', namespace='support')),
    # path('discounts/', include('discounts.urls', namespace='discounts')),
    # path('affiliate/', include('affiliate.urls', namespace='affiliate')),
    # path('loyalty/', include('loyalty.urls', namespace='loyalty')),
    # path('marketing/', include('marketing.urls', namespace='marketing')),

    path('api/', include('api.api_urls')),

    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
