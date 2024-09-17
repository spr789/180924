from django.db import models
from django.conf import settings
from products.models import Product


class SearchQuery(models.Model):
    """
    SearchQuery model stores user search queries.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='search_queries'
    )
    query = models.CharField(max_length=255)
    filters = models.JSONField(blank=True, null=True)  # Store filters applied during search (e.g., price range, categories)
    results_count = models.PositiveIntegerField(default=0)
    searched_at = models.DateTimeField(auto_now_add=True)
    is_successful = models.BooleanField(default=False)  # Tracks if the search returned results

    def __str__(self):
        return f'Search "{self.query}" by {self.user.email if self.user else "Guest"}'


class SearchResult(models.Model):
    """
    SearchResult model stores the results of a search query.
    """
    search_query = models.ForeignKey(
        SearchQuery, 
        on_delete=models.CASCADE, 
        related_name='results'
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rank = models.PositiveIntegerField()  # Rank or position of the product in the search results
    relevance_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)  # Score indicating relevance to the query

    def __str__(self):
        return f'{self.product.name} in search "{self.search_query.query}"'


class SearchIndex(models.Model):
    """
    SearchIndex model stores an index of searchable content for quick retrieval during search.
    """
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='search_index')
    title = models.CharField(max_length=255)
    description = models.TextField()
    sku = models.CharField(max_length=100)  # SKU for the product
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    keywords = models.TextField()  # Keywords extracted from title, description, tags, etc.
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Search index for {self.product.name}'

    class Meta:
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['keywords']),
            models.Index(fields=['sku']),
        ]
        ordering = ['-updated_at']


class FilterOption(models.Model):
    """
    FilterOption model represents available filtering options for search results (e.g., categories, price ranges).
    """
    FILTER_TYPES = [
        ('category', 'Category'),
        ('price', 'Price'),
        ('discounted_price', 'Discounted Price'),
        ('brand', 'Brand'),
        ('sku', 'SKU'),
    ]

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50, choices=FILTER_TYPES)
    value = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.name} ({self.type}): {self.value}'

    class Meta:
        unique_together = ('name', 'type', 'value')
        ordering = ['name']


class PopularSearchTerm(models.Model):
    """
    PopularSearchTerm model stores popular search terms for analytics and auto-suggestions.
    """
    term = models.CharField(max_length=255, unique=True)
    search_count = models.PositiveIntegerField(default=0)
    last_searched = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Popular term: {self.term}'

    class Meta:
        ordering = ['-search_count']


class AutoCompleteSuggestion(models.Model):
    """
    AutoCompleteSuggestion model stores suggestions that appear as users type in the search bar.
    """
    suggestion = models.CharField(max_length=255)
    relevance_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Suggestion: {self.suggestion}'

    class Meta:
        indexes = [
            models.Index(fields=['suggestion']),
        ]
        ordering = ['-relevance_score', '-created_at']
