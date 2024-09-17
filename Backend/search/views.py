from django.shortcuts import render
from django.db.models import Q
from .models import SearchQuery, SearchResult, SearchIndex, PopularSearchTerm, AutoCompleteSuggestion
from products.models import Product

def search_view(request):
    query = request.GET.get('q', '').strip()  # Trim whitespaces
    search_results = []
    results_count = 0

    if query:
        # Record the search query
        search_query = SearchQuery.objects.create(
            user=request.user if request.user.is_authenticated else None,
            query=query
        )

        # Check if the query is numeric (int or float)
        try:
            query_float = float(query)  # If it is a valid number, it's either an int or float
            search_results = SearchIndex.objects.filter(
                Q(price=query_float) |  # Exact match on price
                Q(discounted_price=query_float)  # Exact match on discounted price
            )
        except ValueError:
            # Perform the search in the SearchIndex for text fields (partial match)
            search_results = SearchIndex.objects.filter(
                Q(title__icontains=query) |  # Partial match on title
                Q(description__icontains=query) |  # Partial match on description
                Q(sku__icontains=query) |  # Partial match on SKU
                Q(keywords__icontains=query)  # Partial match on keywords
            )

        # Debugging: Log the number of results and query details
        print(f"Search query: {query}")
        print(f"Found {search_results.count()} results")
        for result in search_results:
            print(result.title, result.price)  # Print results to the console for debugging

        results_count = search_results.count()

        # Record the search results
        search_query.results_count = results_count
        search_query.is_successful = results_count > 0
        search_query.save()

        # Store individual search results
        for index, result in enumerate(search_results):
            SearchResult.objects.create(
                search_query=search_query,
                product=result.product,
                rank=index + 1,
                relevance_score=0  # Default value; adjust as needed
            )

        # Update popular search terms
        popular_term, created = PopularSearchTerm.objects.get_or_create(term=query)
        popular_term.search_count += 1
        popular_term.save()

    return render(request, 'search/search_results.html', {
        'query': query,
        'search_results': search_results,
        'results_count': results_count,
    })

def autocomplete_suggestions(request):
    """
    Provides autocomplete suggestions as the user types in the search bar.
    """
    query = request.GET.get('q', '').strip()  # Remove any leading or trailing whitespaces
    suggestions = []

    if query:
        suggestions = AutoCompleteSuggestion.objects.filter(
            suggestion__icontains=query
        ).order_by('-relevance_score')[:10]

    return render(request, 'search/autocomplete_suggestions.html', {'suggestions': suggestions})
