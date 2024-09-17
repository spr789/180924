from django.urls import path
from . import views

app_name = 'marketing'

urlpatterns = [
    path('dashboard/', views.campaign_dashboard_view, name='campaign_dashboard'),
    path('create/', views.campaign_create_view, name='campaign_create'),
    path('<int:campaign_id>/edit/', views.campaign_edit_view, name='campaign_edit'),
    path('<int:campaign_id>/', views.campaign_detail_view, name='campaign_detail'),
]

