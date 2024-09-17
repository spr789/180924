from django import forms
from .models import searchQuery, searchResult, searchIndex, FilterOption, PopularsearchTerm, AutoCompleteSuggestion

# searchQuery form
class searchQueryForm(forms.ModelForm):
    class Meta:
        model = searchQuery
        fields = ['user', 'query', 'filters', 'is_successful']

# searchResult form
class searchResultForm(forms.ModelForm):
    class Meta:
        model = searchResult
        fields = ['search_query', 'product', 'rank', 'relevance_score']

# searchIndex form
class searchIndexForm(forms.ModelForm):
    class Meta:
        model = searchIndex
        fields = ['product', 'title', 'description', 'sku', 'price', 'discounted_price', 'keywords']

# FilterOption form
class FilterOptionForm(forms.ModelForm):
    class Meta:
        model = FilterOption
        fields = ['name', 'type', 'value', 'is_active']

# PopularsearchTerm form
class PopularsearchTermForm(forms.ModelForm):
    class Meta:
        model = PopularsearchTerm
        fields = ['term']

# AutoCompleteSuggestion form
class AutoCompleteSuggestionForm(forms.ModelForm):
    class Meta:
        model = AutoCompleteSuggestion
        fields = ['suggestion', 'relevance_score']
