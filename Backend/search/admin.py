from django.contrib import admin
from .models import SearchQuery, SearchResult, SearchIndex, FilterOption, PopularSearchTerm, AutoCompleteSuggestion

# Admin for SearchQuery
class SearchQueryAdmin(admin.ModelAdmin):
    list_display = ('user', 'query', 'results_count', 'searched_at', 'is_successful')
    search_fields = ('query', 'user__email')
    list_filter = ('is_successful', 'searched_at')
    readonly_fields = ('searched_at',)

# Admin for SearchResult
class SearchResultAdmin(admin.ModelAdmin):
    list_display = ('search_query', 'product', 'rank', 'relevance_score')
    search_fields = ('search_query__query', 'product__name')
    list_filter = ('rank',)

# Admin for SearchIndex
class SearchIndexAdmin(admin.ModelAdmin):
    list_display = ('product', 'title', 'sku', 'price', 'updated_at')
    search_fields = ('product__name', 'sku', 'title')
    readonly_fields = ('updated_at',)

# Admin for FilterOption
class FilterOptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'value', 'is_active')
    search_fields = ('name', 'type', 'value')
    list_filter = ('type', 'is_active')

# Admin for PopularSearchTerm
class PopularSearchTermAdmin(admin.ModelAdmin):
    list_display = ('term', 'search_count', 'last_searched')
    search_fields = ('term',)
    readonly_fields = ('last_searched',)

# Admin for AutoCompleteSuggestion
class AutoCompleteSuggestionAdmin(admin.ModelAdmin):
    list_display = ('suggestion', 'relevance_score', 'created_at')
    search_fields = ('suggestion',)
    readonly_fields = ('created_at',)

admin.site.register(SearchQuery, SearchQueryAdmin)
admin.site.register(SearchResult, SearchResultAdmin)
admin.site.register(SearchIndex, SearchIndexAdmin)
admin.site.register(FilterOption, FilterOptionAdmin)
admin.site.register(PopularSearchTerm, PopularSearchTermAdmin)
admin.site.register(AutoCompleteSuggestion, AutoCompleteSuggestionAdmin)
