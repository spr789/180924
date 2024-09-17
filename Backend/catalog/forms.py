from django import forms
from .models import Category, Collection

# Category form
class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'slug', 'description', 'parent', 'image', 'meta_title', 'meta_description', 'meta_keywords', 'sort_order', 'is_active']
        widgets = {
            'slug': forms.TextInput(attrs={'readonly': 'readonly'}),  # To show the slug as readonly if it's prepopulated
        }

# Collection form
class CollectionForm(forms.ModelForm):
    class Meta:
        model = Collection
        fields = ['name', 'slug', 'description', 'categories', 'image', 'meta_title', 'meta_description', 'meta_keywords', 'sort_order', 'is_active']
        widgets = {
            'slug': forms.TextInput(attrs={'readonly': 'readonly'}),  # To show the slug as readonly if it's prepopulated
        }
