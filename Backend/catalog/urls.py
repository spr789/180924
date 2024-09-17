from django.urls import path
from . import views

app_name = 'catalog'

urlpatterns = [
    path('categories/', views.category_list, name='category_list'),
    path('categories/<slug:slug>/', views.category_detail, name='category_detail'),
    path('collections/', views.collection_list, name='collection_list'),
    path('collections/<slug:slug>/', views.collection_detail, name='collection_detail'),
    path('manage/categories/', views.manage_category, name='manage_category'),
    path('manage/collections/', views.manage_collection, name='manage_collection'),
]
