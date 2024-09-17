from django.urls import path
from . import views

app_name = 'discounts'

urlpatterns = [
    path('', views.discount_list_view, name='discount_list'),
    path('<int:discount_id>/', views.discount_detail_view, name='discount_detail'),
    path('create/', views.discount_create_view, name='discount_create'),
    path('apply/', views.apply_discount_view, name='apply_discount'),
]

