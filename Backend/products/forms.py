from django import forms
from .models import Product, ProductImage, ProductReview, BulkUpload

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = [
            'name', 'description', 'brand', 'original_price', 'discounted_price',
            'discount_start_date', 'discount_end_date', 'category', 'collections', 'tags',
            'stock', 'sku', 'upc', 'weight', 'dimensions', 'condition', 'shipping_cost',
            'free_shipping', 'is_digital', 'backorder', 'low_stock_threshold', 'warranty_period',
            'returnable', 'is_active', 'available_from', 'available_until'
        ]
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4}),
            'discount_start_date': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'discount_end_date': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'available_from': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'available_until': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
        }

class ProductImageForm(forms.ModelForm):
    class Meta:
        model = ProductImage
        fields = ['image', 'alt_text']
        widgets = {
            'image': forms.ClearableFileInput(attrs={'multiple': True}),
        }

class ProductReviewForm(forms.ModelForm):
    class Meta:
        model = ProductReview
        fields = ['rating', 'comment']
        widgets = {
            'comment': forms.Textarea(attrs={'rows': 3}),
        }

class BulkUploadForm(forms.ModelForm):
    class Meta:
        model = BulkUpload
        fields = ['file']
        widgets = {
            'file': forms.FileInput(attrs={'accept': '.csv, .xlsx'}),
        }
