from django.contrib import admin
from .models import VendorProfile, VendorOrder, VendorShipment, VendorAnalytics, VendorPayout, VendorNotification

# Admin for VendorProfile
class VendorProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'business_name', 'verification_status', 'verified_at')
    search_fields = ('user__phone_number', 'business_name')
    list_filter = ('verification_status',)
    readonly_fields = ('created_at', 'updated_at')

    def save_model(self, request, obj, form, change):
        if not obj.user_id:
            obj.user = request.user
        super().save_model(request, obj, form, change)

# Admin for VendorOrder
class VendorOrderAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'order', 'product', 'quantity', 'price', 'status')
    search_fields = ('vendor__business_name', 'order__order_number', 'product__name')
    list_filter = ('status',)

# Admin for VendorShipment
class VendorShipmentAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'shipment', 'order', 'shipped_date', 'delivery_date', 'tracking_number')
    search_fields = ('vendor__business_name', 'order__order_number', 'tracking_number')
    list_filter = ('status', 'shipped_date', 'delivery_date')

# Admin for VendorAnalytics
class VendorAnalyticsAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'total_sales', 'total_orders', 'total_revenue', 'last_updated')
    search_fields = ('vendor__business_name',)
    readonly_fields = ('last_updated',)

# Admin for VendorPayout
class VendorPayoutAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'amount', 'payout_date', 'status')
    search_fields = ('vendor__business_name',)
    list_filter = ('status',)

# Admin for VendorNotification
class VendorNotificationAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'message', 'created_at', 'read')
    search_fields = ('vendor__business_name', 'message')
    list_filter = ('read',)

admin.site.register(VendorProfile, VendorProfileAdmin)
admin.site.register(VendorOrder, VendorOrderAdmin)
admin.site.register(VendorShipment, VendorShipmentAdmin)
admin.site.register(VendorAnalytics, VendorAnalyticsAdmin)
admin.site.register(VendorPayout, VendorPayoutAdmin)
admin.site.register(VendorNotification, VendorNotificationAdmin)
