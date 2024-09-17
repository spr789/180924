from django.contrib import admin
from .models import VendorNotification

# Admin for VendorNotification
class VendorNotificationAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'message', 'created_at', 'read')
    search_fields = ('vendor__business_name', 'message')
    list_filter = ('read', 'created_at')
    readonly_fields = ('created_at',)

admin.site.register(VendorNotification, VendorNotificationAdmin)
