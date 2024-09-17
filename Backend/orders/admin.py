from django.contrib import admin
from .models import Order, OrderItem, OrderStatusHistory

# Admin for Order
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'status', 'total_amount', 'grand_total', 'created_at', 'updated_at')
    search_fields = ('order_number', 'user__email', 'tracking_number')
    list_filter = ('status', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at', 'order_number', 'total_amount', 'grand_total')

# Admin for OrderItem
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price', 'total_price')
    search_fields = ('order__order_number', 'product__name')
    list_filter = ('order__created_at', 'product__name')

# Admin for OrderStatusHistory
class OrderStatusHistoryAdmin(admin.ModelAdmin):
    list_display = ('order', 'status', 'changed_at', 'changed_by')
    search_fields = ('order__order_number', 'status', 'changed_by__email')
    list_filter = ('status', 'changed_at')

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(OrderStatusHistory, OrderStatusHistoryAdmin)
