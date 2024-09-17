from django.urls import path
from . import views

app_name = 'search'  # Make sure you define the app_name

urlpatterns = [
    path('', views.search_view, name='search_results'),  # Notice the name is 'search_results', not 'search_view'
    path('autocomplete/', views.autocomplete_suggestions, name='autocomplete_suggestions'),
]
