from django.contrib import admin
from .models import ShippingMethod, Shipment, ShippingRate, ShipmentItem

# Admin for ShippingMethod
class ShippingMethodAdmin(admin.ModelAdmin):
    list_display = ('name', 'cost', 'estimated_delivery_time', 'active')
    search_fields = ('name', 'description')
    list_filter = ('active',)

# Admin for Shipment
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ('get_order_number', 'vendor', 'shipping_method', 'tracking_number', 'status', 'shipped_at', 'delivered_at')
    search_fields = ('tracking_number', 'vendor__business_name', 'shipping_method__name')
    list_filter = ('status', 'shipped_at', 'delivered_at')
    readonly_fields = ('created_at', 'updated_at')

    def get_order_number(self, obj):
        return obj.get_order().order_number
    get_order_number.short_description = 'Order Number'

# Admin for ShippingRate
class ShippingRateAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'shipping_method', 'origin_country', 'destination_country', 'rate', 'delivery_time')
    search_fields = ('vendor__business_name', 'origin_country', 'destination_country')
    list_filter = ('shipping_method', 'origin_country', 'destination_country')

# Admin for ShipmentItem
class ShipmentItemAdmin(admin.ModelAdmin):
    list_display = ('get_tracking_number', 'product', 'quantity', 'weight', 'dimensions')
    search_fields = ('product__name',)
    list_filter = ('shipment__status',)

    def get_tracking_number(self, obj):
        return obj.shipment.tracking_number
    get_tracking_number.short_description = 'Tracking Number'

admin.site.register(ShippingMethod, ShippingMethodAdmin)
admin.site.register(Shipment, ShipmentAdmin)
admin.site.register(ShippingRate, ShippingRateAdmin)
admin.site.register(ShipmentItem, ShipmentItemAdmin)
