from rest_framework import serializers
from .models import SearchQuery, SearchResult, SearchIndex, PopularSearchTerm, AutoCompleteSuggestion

class SearchResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchResult
        fields = ['id', 'search_query', 'product', 'rank', 'relevance_score']

class SearchQuerySerializer(serializers.ModelSerializer):
    results = SearchResultSerializer(many=True, read_only=True)
    
    class Meta:
        model = SearchQuery
        fields = ['id', 'user', 'query', 'filters', 'results_count', 'searched_at', 'is_successful', 'results']
        read_only_fields = ['user', 'results_count', 'is_successful']

class SearchIndexSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchIndex
        fields = ['id', 'product', 'title', 'description']

class PopularSearchTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopularSearchTerm
        fields = ['id', 'term']

class AutoCompleteSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutoCompleteSuggestion
        fields = ['id', 'suggestion', 'relevance_score']
