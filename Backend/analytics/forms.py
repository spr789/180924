from django import forms
from .models import UserActivity, ProductView, SalesData, searchanalytics, TrafficData, VendorPerformance, RealTimeanalytics, Alert, DataExport, CustomReport

# UserActivity form
class UserActivityForm(forms.ModelForm):
    class Meta:
        model = UserActivity
        fields = ['user', 'session_id', 'activity_type', 'product', 'extra_data']

# ProductView form
class ProductViewForm(forms.ModelForm):
    class Meta:
        model = ProductView
        fields = ['product', 'user', 'session_id']

# SalesData form
class SalesDataForm(forms.ModelForm):
    class Meta:
        model = SalesData
        fields = ['vendor', 'total_sales', 'total_orders', 'total_revenue', 'total_discounts', 'total_refunds', 'start_date', 'end_date']

# searchanalytics form
class searchanalyticsForm(forms.ModelForm):
    class Meta:
        model = searchanalytics
        fields = ['query', 'total_results', 'search_count']

# TrafficData form
class TrafficDataForm(forms.ModelForm):
    class Meta
