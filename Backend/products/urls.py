from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('', views.product_list, name='product_list'),
    
    path('manage/', views.manage_products, name='manage_products'),
    path('add/', views.add_product, name='add_product'),
    path('edit/<int:product_id>/', views.edit_product, name='edit_product'),
    path('delete/<int:product_id>/', views.delete_product, name='delete_product'),
    path('bulk-upload/', views.bulk_upload_products, name='bulk_upload_products'),
    path('add-image/<int:product_id>/', views.add_product_image, name='add_product_image'),
    path('add-review/<int:product_id>/', views.add_review, name='add_review'),
    path('manage/', views.manage_products, name='manage_products'),
    path('<slug:slug>/', views.product_detail, name='product_detail'),
]
