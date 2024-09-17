from django import forms
from .models import shippingMethod, Shipment, shippingRate, ShipmentItem

# shippingMethod form
class shippingMethodForm(forms.ModelForm):
    class Meta:
        model = shippingMethod
        fields = ['name', 'description', 'cost', 'estimated_delivery_time', 'active']

# Shipment form
class ShipmentForm(forms.ModelForm):
    class Meta:
        model = Shipment
        fields = ['order', 'vendor', 'shipping_method', 'tracking_number', 'status', 'shipped_at', 'delivered_at']

# shippingRate form
class shippingRateForm(forms.ModelForm):
    class Meta:
        model = shippingRate
        fields = ['vendor', 'shipping_method', 'origin_country', 'destination_country', 'rate', 'delivery_time']

# ShipmentItem form
class ShipmentItemForm(forms.ModelForm):
    class Meta:
        model = ShipmentItem
        fields = ['shipment', 'product', 'quantity', 'weight', 'dimensions']
