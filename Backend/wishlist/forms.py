from django import forms
from .models import wishlist, wishlistItem

# wishlist form
class wishlistForm(forms.ModelForm):
    class Meta:
        model = wishlist
        fields = ['user', 'name', 'description', 'is_public']

# wishlistItem form
class wishlistItemForm(forms.ModelForm):
    class Meta:
        model = wishlistItem
        fields = ['wishlist', 'product', 'quantity_desired', 'priority', 'notes', 'is_available']
