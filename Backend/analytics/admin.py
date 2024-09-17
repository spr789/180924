from django.contrib import admin
from .models import UserActivity, ProductView, SalesData, SearchAnalytics, TrafficData, VendorPerformance, RealTimeAnalytics, Alert, DataExport, CustomReport

# Admin for UserActivity
class UserActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity_type', 'product', 'timestamp')
    search_fields = ('user__email', 'activity_type', 'product__name')
    list_filter = ('activity_type', 'timestamp')
    readonly_fields = ('timestamp',)

# Admin for ProductView
class ProductViewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'viewed_at')
    search_fields = ('product__name', 'user__email')
    list_filter = ('viewed_at',)
    readonly_fields = ('viewed_at',)

# Admin for SalesData
class SalesDataAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'total_sales', 'total_orders', 'total_revenue', 'start_date', 'end_date', 'updated_at')
    search_fields = ('vendor__business_name',)
    list_filter = ('start_date', 'end_date')
    readonly_fields = ('updated_at',)

# Admin for searchanalytics
class searchanalyticsAdmin(admin.ModelAdmin):
    list_display = ('query', 'total_results', 'search_count', 'last_searched_at')
    search_fields = ('query',)
    readonly_fields = ('last_searched_at',)

# Admin for TrafficData
class TrafficDataAdmin(admin.ModelAdmin):
    list_display = ('date', 'page_views', 'unique_visitors', 'orders_placed', 'revenue_generated')
    search_fields = ('date',)
    readonly_fields = ('date',)

# Admin for VendorPerformance
class VendorPerformanceAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'average_order_value', 'conversion_rate', 'return_rate', 'feedback_score', 'start_date', 'end_date', 'updated_at')
    search_fields = ('vendor__business_name',)
    list_filter = ('start_date', 'end_date')
    readonly_fields = ('updated_at',)

# Admin for RealTimeanalytics
class RealTimeanalyticsAdmin(admin.ModelAdmin):
    list_display = ('metric_name', 'value', 'timestamp')
    search_fields = ('metric_name',)
    readonly_fields = ('timestamp',)

# Admin for Alert
class AlertAdmin(admin.ModelAdmin):
    list_display = ('metric_name', 'condition', 'threshold', 'triggered_at', 'is_triggered')
    search_fields = ('metric_name',)
    list_filter = ('is_triggered',)
    readonly_fields = ('triggered_at',)

# Admin for DataExport
class DataExportAdmin(admin.ModelAdmin):
    list_display = ('export_type', 'file_path', 'created_at', 'requested_by')
    search_fields = ('export_type', 'requested_by__email')
    readonly_fields = ('created_at', 'file_path')

# Admin for CustomReport
class CustomReportAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'generated_at', 'generated_by', 'file_path')
    search_fields = ('name', 'generated_by__email')
    readonly_fields = ('generated_at', 'file_path')

admin.site.register(UserActivity, UserActivityAdmin)
admin.site.register(ProductView, ProductViewAdmin)
admin.site.register(SalesData, SalesDataAdmin)
admin.site.register(SearchAnalytics, searchanalyticsAdmin)
admin.site.register(TrafficData, TrafficDataAdmin)
admin.site.register(VendorPerformance, VendorPerformanceAdmin)
admin.site.register(RealTimeAnalytics, RealTimeanalyticsAdmin)
admin.site.register(Alert, AlertAdmin)
admin.site.register(DataExport, DataExportAdmin)
admin.site.register(CustomReport, CustomReportAdmin)
