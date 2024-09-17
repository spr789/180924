from django.urls import path
from . import views

app_name = 'analytics'

urlpatterns = [
    # User Activity
    path('user-activity/', views.user_activity_view, name='user_activity'),

    # Product Views
    path('product-views/', views.product_views_view, name='product_views'),

    # Sales Data
    path('sales-data/', views.sales_data_view, name='sales_data'),

    # Search Analytics
    path('search-analytics/', views.search_analytics_view, name='search_analytics'),

    # Traffic Data
    path('traffic-data/', views.traffic_data_view, name='traffic_data'),

    # Vendor Performance
    path('vendor-performance/', views.vendor_performance_view, name='vendor_performance'),

    # Real-Time Analytics
    path('real-time-analytics/', views.real_time_analytics_view, name='real_time_analytics'),

    # Alerts
    path('alerts/', views.alert_view, name='alerts'),

    # Data Export
    path('data-export/', views.data_export_view, name='data_export'),

    # Custom Reports
    path('custom-reports/', views.custom_report_view, name='custom_reports'),
]
