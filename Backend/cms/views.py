from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Page, BlogPost, BlogCategory, Tag, MenuItem, ContactFormSubmission, Banner, FAQ, Testimonial, Gallery, Event
from .forms import PageForm, BlogPostForm, ContactForm
from products.models import Product

# Pages
def page_view(request, slug):
    """
    Displays a static page.
    """
    page = get_object_or_404(Page, slug=slug, is_published=True)
    return render(request, 'cms/page.html', {'page': page})

# Blog Posts
def blog_list(request):
    """
    Displays a list of all published blog posts.
    """
    posts = BlogPost.objects.filter(is_published=True).order_by('-published_at')
    return render(request, 'cms/blog_list.html', {'posts': posts})

def blog_detail(request, slug):
    """
    Displays a single blog post.
    """
    post = get_object_or_404(BlogPost, slug=slug, is_published=True)
    return render(request, 'cms/blog_detail.html', {'post': post})

# Contact Form
def contact_view(request):
    """
    Displays and handles the contact form submission.
    """
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('contact_thanks')
    else:
        form = ContactForm()

    return render(request, 'cms/contact.html', {'form': form})

def contact_thanks_view(request):
    """
    Displays a thank you message after contact form submission.
    """
    return render(request, 'cms/contact_thanks.html')

# FAQs
def faq_list(request):
    """
    Displays a list of all active FAQs.
    """
    faqs = FAQ.objects.filter(is_active=True).order_by('order')
    return render(request, 'cms/faq_list.html', {'faqs': faqs})

# Testimonials
def testimonial_list(request):
    """
    Displays a list of all active testimonials.
    """
    testimonials = Testimonial.objects.filter(is_active=True).order_by('-created_at')
    return render(request, 'cms/testimonial_list.html', {'testimonials': testimonials})

# Events
def event_list(request):
    """
    Displays a list of all published events.
    """
    events = Event.objects.filter(is_published=True).order_by('-start_date')
    return render(request, 'cms/event_list.html', {'events': events})

def event_detail(request, slug):
    """
    Displays details of a specific event.
    """
    event = get_object_or_404(Event, slug=slug, is_published=True)
    return render(request, 'cms/event_detail.html', {'event': event})

# Gallery
def gallery_list(request):
    """
    Displays a list of all active gallery images.
    """
    gallery_items = Gallery.objects.filter(is_active=True).order_by('-created_at')
    return render(request, 'cms/gallery_list.html', {'gallery_items': gallery_items})



def home_view(request):
    # Fetch multiple products
    featured_products = Product.objects.filter(is_active=True, status='approved')[:4]  # Limit to the first 4 products
    

    # Other logic...

    return render(request, 'home.html', {'featured_products': featured_products})

