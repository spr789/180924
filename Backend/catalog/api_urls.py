from django.urls import path
from .api import CategoryListCreateAPIView, CategoryDetailAPIView, CollectionListCreateAPIView, CollectionDetailAPIView

app_name = 'catalog-api'

urlpatterns = [
    # Category API Endpoints
    path('categories/', CategoryListCreateAPIView.as_view(), name='category_list_create'),
    path('categories/<slug:slug>/', CategoryDetailAPIView.as_view(), name='category_detail'),

    # Collection API Endpoints
    path('collections/', CollectionListCreateAPIView.as_view(), name='collection_list_create'),
    path('collections/<slug:slug>/', CollectionDetailAPIView.as_view(), name='collection_detail'),
]
