from django import forms
from .models import Product, ProductImage, ProductReview, ProductSpecification, BulkUpload

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = [
            'name', 'slug', 'description', 'brand', 'original_price', 'discounted_price',
            'discount_start_date', 'discount_end_date', 'category', 'collections', 'tags', 'stock',
            'sku', 'upc', 'weight', 'dimensions', 'condition', 'shipping_cost', 'free_shipping',
            'is_digital', 'backorder',  'warranty_period', 'returnable',
            'is_active', 'available_from', 'available_until'
        ]  # Exclude fields like vendor, status, average_rating, etc.
        widgets = {
            'slug': forms.TextInput(attrs={'readonly': 'readonly'}),
        }


class ProductImageForm(forms.ModelForm):
    class Meta:
        model = ProductImage
        fields = ['image']  # Only include the image field
        widgets = {
            'image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }


# ProductReview form
class ProductReviewForm(forms.ModelForm):
    class Meta:
        model = ProductReview
        fields = ['product', 'customer', 'rating', 'comment']

# ProductSpecification form
class ProductSpecificationForm(forms.ModelForm):
    class Meta:
        model = ProductSpecification
        fields = ['product', 'name', 'value']

# BulkUpload form
class BulkUploadForm(forms.ModelForm):
    class Meta:
        model = BulkUpload
        fields = ['vendor', 'file']
