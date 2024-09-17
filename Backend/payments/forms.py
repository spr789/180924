from django import forms
from .models import PaymentMethod, Payment, Refund

# PaymentMethod form
class PaymentMethodForm(forms.ModelForm):
    class Meta:
        model = PaymentMethod
        fields = ['name', 'description', 'is_active']

# Payment form
class PaymentForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = ['order', 'user', 'payment_method', 'amount', 'transaction_id', 'status', 'paid_at', 'refunded_at']

# Refund form
class RefundForm(forms.ModelForm):
    class Meta:
        model = Refund
        fields = ['payment', 'amount', 'reason', 'status']
