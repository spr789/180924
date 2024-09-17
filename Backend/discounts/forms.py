from django import forms
from .models import Discount, DiscountUsage

# Discount form
class DiscountForm(forms.ModelForm):
    class Meta:
        model = Discount
        fields = [
            'name', 'code', 'description', 'discount_type', 'value', 'minimum_order_value',
            'max_uses', 'valid_from', 'valid_until', 'is_active', 'vendor', 'applicable_to',
            'applicable_categories'
        ]

# DiscountUsage form
class DiscountUsageForm(forms.ModelForm):
    class Meta:
        model = DiscountUsage
        fields = ['discount', 'user', 'order_id']
