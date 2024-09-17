from django import forms
from .models import VendorProfile, VendorOrder, VendorShipment, VendorPayout, VendorNotification

# VendorProfile form
class VendorProfileForm(forms.ModelForm):
    class Meta:
        model = VendorProfile
        fields = ['business_name', 'business_address', 'website_url', 'verification_status']

# VendorOrder form
class VendorOrderForm(forms.ModelForm):
    class Meta:
        model = VendorOrder
        fields = ['vendor', 'order', 'product', 'quantity', 'price', 'status']

# VendorShipment form
class VendorShipmentForm(forms.ModelForm):
    class Meta:
        model = VendorShipment
        fields = ['vendor', 'shipment', 'order', 'shipped_date', 'delivery_date', 'tracking_number', 'status']

# VendorPayout form
class VendorPayoutForm(forms.ModelForm):
    class Meta:
        model = VendorPayout
        fields = ['vendor', 'amount', 'status']

# VendorNotification form
class VendorNotificationForm(forms.ModelForm):
    class Meta:
        model = VendorNotification
        fields = ['vendor', 'message', 'read']
