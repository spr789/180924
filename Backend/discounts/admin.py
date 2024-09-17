from django.contrib import admin
from .models import Discount, DiscountUsage

# Admin for Discount
class DiscountAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'discount_type', 'value', 'valid_from', 'valid_until', 'is_active', 'used_count', 'max_uses')
    search_fields = ('name', 'code')
    list_filter = ('discount_type', 'is_active', 'valid_from', 'valid_until')
    readonly_fields = ('used_count', 'created_at', 'updated_at')

# Admin for DiscountUsage
class DiscountUsageAdmin(admin.ModelAdmin):
    list_display = ('discount', 'user', 'order_id', 'used_at')
    search_fields = ('discount__name', 'user__email', 'order_id')
    list_filter = ('used_at',)
    readonly_fields = ('used_at',)

admin.site.register(Discount, DiscountAdmin)
admin.site.register(DiscountUsage, DiscountUsageAdmin)
