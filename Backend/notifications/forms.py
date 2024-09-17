from django import forms
from .models import VendorNotification

# VendorNotification form
class VendorNotificationForm(forms.ModelForm):
    class Meta:
        model = VendorNotification
        fields = ['vendor', 'message', 'read']
