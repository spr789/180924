from django.urls import path
from . import views

app_name = 'reviews'

urlpatterns = [
    path('', views.review_list_view, name='review_list'),
    path('<int:review_id>/', views.review_detail_view, name='review_detail'),
    path('create/', views.review_create_view, name='review_create'),
]

