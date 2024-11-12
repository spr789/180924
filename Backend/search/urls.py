from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SearchViewSet, SearchHistoryViewSet, SearchQueryViewSet

router = DefaultRouter()
router.register(r'search', SearchViewSet, basename='search')
router.register(r'search-history', SearchHistoryViewSet, basename='search-history')
router.register(r'search-queries', SearchQueryViewSet, basename='search-query')

urlpatterns = [
    path('', include(router.urls)),  # Including all viewsets' routes
]
