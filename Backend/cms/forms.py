from django import forms
from .models import Page, BlogPost, BlogCategory, Tag, MenuItem, Banner, FAQ, Testimonial, Gallery, Event

# Page form
class PageForm(forms.ModelForm):
    class Meta:
        model = Page
        fields = ['title', 'slug', 'content', 'meta_title', 'meta_description', 'meta_keywords', 'is_published', 'author']
        widgets = {
            'slug': forms.TextInput(attrs={'readonly': 'readonly'}),
        }

# BlogPost form
class BlogPostForm(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = [
            'title', 'slug', 'content', 'excerpt', 'featured_image', 'author', 'is_published',
            'meta_title', 'meta_description', 'meta_keywords', 'tags', 'categories'
        ]
        widgets = {
            'slug': forms.TextInput(attrs={'readonly': 'readonly'}),
        }

# BlogCategory form
class BlogCategoryForm(forms.ModelForm):
    class Meta:
        model = BlogCategory
        fields = ['name', 'slug', 'description']
        widgets = {
            'slug': forms.TextInput(attrs={'readonly': 'readonly'}),
        }

# Tag form
class TagForm(forms.ModelForm):
    class Meta:
        model = Tag
        fields = ['name', 'slug']
        widgets = {
            'slug': forms.TextInput(attrs={'readonly': 'readonly'}),
        }

# MenuItem form
class MenuItemForm(forms.ModelForm):
    class Meta:
        model = MenuItem
        fields = ['title', 'url', 'parent', 'order', 'is_active']

# Banner form
class BannerForm(forms.ModelForm):
    class Meta:
        model = Banner
        fields = ['title', 'image', 'url', 'position', 'is_active']

# FAQ form
class FAQForm(forms.ModelForm):
    class Meta:
        model = FAQ
        fields = ['question', 'answer', 'order', 'is_active']

# Testimonial form
class TestimonialForm(forms.ModelForm):
    class Meta:
        model = Testimonial
        fields = ['customer_name', 'testimonial', 'image', 'is_active']

# Gallery form
class GalleryForm(forms.ModelForm):
    class Meta:
        model = Gallery
        fields = ['title', 'image', 'description', 'is_active']

# Event form
class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ['title', 'slug', 'description', 'location', 'start_date', 'end_date', 'is_published']
        widgets = {
            'slug': forms.TextInput(attrs={'readonly': 'readonly'}),
        }


class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)
