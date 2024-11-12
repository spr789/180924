from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'search'

router = DefaultRouter()
router.register(r'queries', views.SearchQueryViewSet, basename='search-query')
router.register(r'results', views.SearchResultViewSet, basename='search-result')
router.register(r'index', views.SearchIndexViewSet, basename='search-index')
router.register(r'filters', views.FilterOptionViewSet, basename='filter-option')
router.register(r'popular', views.PopularSearchTermViewSet, basename='popular-search')
router.register(r'suggestions', views.AutoCompleteSuggestionViewSet, basename='autocomplete')

urlpatterns = router.urls

# Add additional URL patterns
urlpatterns += [
    path('api/', include(router.urls)),
]
