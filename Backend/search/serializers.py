from rest_framework import serializers
from .models import SearchQuery, SearchResult, SearchIndex, FilterOption, PopularSearchTerm, AutoCompleteSuggestion

class SearchResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchResult
        fields = ['id', 'product', 'rank', 'relevance_score']

class SearchQuerySerializer(serializers.ModelSerializer):
    results = SearchResultSerializer(many=True, read_only=True)
    
    class Meta:
        model = SearchQuery
        fields = ['id', 'user', 'query', 'filters', 'results_count', 'searched_at', 'is_successful', 'results']
        read_only_fields = ['user', 'results_count', 'is_successful']

class SearchIndexSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchIndex
        fields = ['id', 'product', 'title', 'description', 'sku', 'price', 'discounted_price', 'keywords', 'updated_at']
        read_only_fields = ['updated_at']

class FilterOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilterOption
        fields = ['id', 'name', 'type', 'value', 'is_active']

class PopularSearchTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopularSearchTerm
        fields = ['id', 'term', 'search_count', 'last_searched']
        read_only_fields = ['search_count', 'last_searched']

class AutoCompleteSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutoCompleteSuggestion
        fields = ['id', 'suggestion', 'relevance_score', 'created_at']
        read_only_fields = ['created_at']

