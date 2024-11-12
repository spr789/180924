from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Q, F
from .models import SearchQuery, SearchResult, SearchIndex
from .serializers import SearchQuerySerializer, SearchResultSerializer, SearchIndexSerializer
from products.models import Product

class SearchViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing search functionality
    """
    serializer_class = SearchIndexSerializer
    queryset = SearchIndex.objects.all()

    def list(self, request):
        query = request.query_params.get('q', '').strip()
        search_results = []
        results_count = 0

        if query:
            # Record the search query
            search_query = SearchQuery.objects.create(
                user=request.user if request.user.is_authenticated else None,
                query=query,
                filters=request.query_params.get('filters')
            )

            # Perform search on SearchIndex
            search_results = self.queryset.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query)
            ).distinct()

            results_count = search_results.count()

            # Record search metadata
            search_query.results_count = results_count
            search_query.is_successful = results_count > 0
            search_query.save()

            # Store individual results
            SearchResult.objects.bulk_create([
                SearchResult(
                    search_query=search_query,
                    product=result.product,
                    rank=index + 1,
                    relevance_score=0.00
                ) for index, result in enumerate(search_results)
            ])

        serializer = self.get_serializer(search_results, many=True)
        return Response({
            'query': query,
            'results': serializer.data,
            'count': results_count
        })

class SearchHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for user's search history
    """
    serializer_class = SearchQuerySerializer
    
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return SearchQuery.objects.filter(user=self.request.user).order_by('-searched_at')
        return SearchQuery.objects.none()

class SearchQueryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for search queries
    """
    serializer_class = SearchQuerySerializer
    queryset = SearchQuery.objects.all().order_by('-searched_at')
