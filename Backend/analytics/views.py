from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import UserActivity, ProductView, SalesData, SearchAnalytics, TrafficData, VendorPerformance, RealTimeAnalytics

@login_required
def user_activity_view(request):
    """
    View to display a user's activities.
    """
    activities = UserActivity.objects.filter(user=request.user).order_by('-timestamp')
    return render(request, 'analytics/user_activity.html', {'activities': activities})

@login_required
def product_views_view(request):
    """
    View to display the products viewed by the user.
    """
    product_views = ProductView.objects.filter(user=request.user).order_by('-viewed_at')
    return render(request, 'analytics/product_views.html', {'product_views': product_views})

@login_required
def sales_data_view(request):
    """
    View to display sales data.
    """
    sales_data = SalesData.objects.filter(user=request.user).order_by('-date')
    return render(request, 'analytics/sales_data.html', {'sales_data': sales_data})

@login_required
def search_analytics_view(request):
    """
    View to display search analytics.
    """
    search_analytics = SearchAnalytics.objects.filter(user=request.user).order_by('-search_count')
    return render(request, 'analytics/search_analytics.html', {'search_analytics': search_analytics})

@login_required
def traffic_data_view(request):
    """
    View to display traffic data.
    """
    traffic_data = TrafficData.objects.filter(user=request.user).order_by('-date')
    return render(request, 'analytics/traffic_data.html', {'traffic_data': traffic_data})

@login_required
def vendor_performance_view(request):
    """
    View to display vendor performance.
    """
    vendor_performance = VendorPerformance.objects.filter(vendor__user=request.user).order_by('-total_sales')
    return render(request, 'analytics/vendor_performance.html', {'vendor_performance': vendor_performance})

@login_required
def real_time_analytics_view(request):
    """
    View to display real-time analytics.
    """
    real_time_analytics = RealTimeAnalytics.objects.filter(user=request.user).order_by('-timestamp')
    return render(request, 'analytics/real_time_analytics.html', {'real_time_analytics': real_time_analytics})

@login_required
def alert_view(request):
    """
    View to display alerts based on specific conditions.
    """
    alerts = Alert.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'analytics/alerts.html', {'alerts': alerts})

@login_required
def data_export_view(request):
    """
    View to handle data export requests.
    """
    data_exports = DataExport.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'analytics/data_exports.html', {'data_exports': data_exports})

@login_required
def custom_report_view(request):
    """
    View to generate and display custom reports.
    """
    custom_reports = CustomReport.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'analytics/custom_reports.html', {'custom_reports': custom_reports})
