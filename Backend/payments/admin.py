from django.contrib import admin
from .models import PaymentMethod, Payment, Refund

# Admin for PaymentMethod
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    list_filter = ('is_active',)
    readonly_fields = ('created_at', 'updated_at')

# Admin for Payment
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'user', 'payment_method', 'amount', 'transaction_id', 'status', 'paid_at', 'created_at')
    search_fields = ('order__order_number', 'user__email', 'transaction_id')
    list_filter = ('status', 'paid_at', 'created_at')
    readonly_fields = ('created_at', 'updated_at', 'transaction_id')

# Admin for Refund
class RefundAdmin(admin.ModelAdmin):
    list_display = ('payment', 'amount', 'status', 'processed_at')
    search_fields = ('payment__transaction_id', 'payment__order__order_number')
    list_filter = ('status', 'processed_at')
    readonly_fields = ('processed_at',)

admin.site.register(PaymentMethod, PaymentMethodAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(Refund, RefundAdmin)
