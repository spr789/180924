from django.contrib import admin
from .models import wishlist, wishlistItem

# Admin for wishlist
class wishlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'is_public', 'item_count', 'created_at', 'updated_at')
    search_fields = ('user__email', 'name')
    list_filter = ('is_public', 'created_at')
    readonly_fields = ('created_at', 'updated_at', 'last_accessed', 'item_count')

# Admin for wishlistItem
class wishlistItemAdmin(admin.ModelAdmin):
    list_display = ('wishlist', 'product', 'quantity_desired', 'priority', 'is_available', 'added_at', 'updated_at')
    search_fields = ('wishlist__user__email', 'product__name')
    list_filter = ('is_available', 'added_at', 'updated_at')
    readonly_fields = ('added_at', 'updated_at', 'price_at_addition', 'last_checked_price')

admin.site.register(wishlist, wishlistAdmin)
admin.site.register(wishlistItem, wishlistItemAdmin)
