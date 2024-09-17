from django.contrib import admin
from .models import cart, cartItem, Abandonedcart, AbandonedcartItem

# Admin for cart
class cartAdmin(admin.ModelAdmin):
    list_display = ('user', 'session_id', 'is_active', 'is_abandoned', 'created_at', 'updated_at')
    search_fields = ('user__email', 'session_id')
    list_filter = ('is_active', 'is_abandoned')
    readonly_fields = ('created_at', 'updated_at', 'last_activity', 'abandoned_at', 'recovered')

# Admin for cartItem
class cartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity', 'added_at', 'updated_at')
    search_fields = ('cart__user__email', 'product__name')
    list_filter = ('added_at',)

# Admin for Abandonedcart
class AbandonedcartAdmin(admin.ModelAdmin):
    list_display = ('user', 'session_id', 'total_amount', 'abandoned_at', 'is_recovered', 'recovered_at')
    search_fields = ('user__email', 'session_id')
    list_filter = ('is_recovered', 'abandoned_at')

# Admin for AbandonedcartItem
class AbandonedcartItemAdmin(admin.ModelAdmin):
    list_display = ('abandoned_cart', 'product', 'quantity', 'price', 'total_price')
    search_fields = ('abandoned_cart__user__email', 'product__name')
    list_filter = ('abandoned_cart__abandoned_at',)

admin.site.register(cart, cartAdmin)
admin.site.register(cartItem, cartItemAdmin)
admin.site.register(Abandonedcart, AbandonedcartAdmin)
admin.site.register(AbandonedcartItem, AbandonedcartItemAdmin)
