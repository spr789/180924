from django import forms
from .models import Cart, CartItem, AbandonedCart, AbandonedCartItem
from accounts.models import Address

# Cart form
class CartForm(forms.ModelForm):
    class Meta:
        model = Cart
        fields = ['user', 'session_id', 'is_active', 'is_abandoned', 'reminder_sent', 'recovered']

# CartItem form 
class CartItemForm(forms.ModelForm):
    class Meta:
        model = CartItem
        fields = ['cart', 'product', 'quantity']

# AbandonedCart form
class AbandonedCartForm(forms.ModelForm):
    class Meta:
        model = AbandonedCart
        fields = ['user', 'session_id', 'shipping_address', 'billing_address', 'total_amount', 'is_recovered']

# AbandonedCartItem form
class AbandonedCartItemForm(forms.ModelForm):
    class Meta:
        model = AbandonedCartItem
        fields = ['abandoned_cart', 'product', 'quantity', 'price', 'total_price']

# Checkout form for collecting shipping/billing details
class CheckoutForm(forms.Form):
    name = forms.CharField(max_length=255, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Full Name'
    }))
    email = forms.EmailField(required=False, widget=forms.EmailInput(attrs={
        'class': 'form-control', 
        'placeholder': 'Email Address'
    }))
    phone_number = forms.CharField(max_length=15, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Phone Number'
    }))
    address1 = forms.CharField(max_length=255, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Address Line 1'
    }))
    landmark = forms.CharField(max_length=255, required=False, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Landmark (Optional)'
    }))
    city = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'City'
    }))
    state = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'State'
    }))
    pin_code = forms.CharField(max_length=20, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Postal Code'
    }))
    country = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Country'
    }))

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if not email and not self.initial.get('user').is_authenticated:
            raise forms.ValidationError("Email is required for guest checkout.")
        return email

    def save_address(self, user):
        address = Address.objects.create(
            user=user,
            name=self.cleaned_data['name'],
            address_line_1=self.cleaned_data['address1'],
            landmark=self.cleaned_data['landmark'],
            phone_number=self.cleaned_data['phone_number'],
            city=self.cleaned_data['city'],
            state=self.cleaned_data['state'],
            postal_code=self.cleaned_data['pin_code'],
            country=self.cleaned_data['country'],
            address_type='shipping',
            is_default=True
        )
        return address
