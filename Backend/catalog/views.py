from django.shortcuts import render, get_object_or_404
from .models import Category, Collection
from django.contrib.auth.decorators import login_required

def category_list(request):
    """
    Displays a list of all active categories.
    """
    categories = Category.objects.filter(is_active=True).order_by('sort_order', 'name')
    return render(request, 'catalog/category_list.html', {'categories': categories})

def category_detail(request, slug):
    category = get_object_or_404(Category, slug=slug, is_active=True)
    subcategories = category.subcategories.filter(is_active=True).order_by('sort_order', 'name')
    products = category.products.filter(is_active=True)  # Fetching only active products

    context = {
        'category': category,
        'subcategories': subcategories,
        'products': products,
    }

    return render(request, 'catalog/category_detail.html', context)

def collection_list(request):
    """
    Displays a list of all active collections.
    """
    collections = Collection.objects.filter(is_active=True).order_by('sort_order', 'name')
    return render(request, 'catalog/collection_list.html', {'collections': collections})

def collection_detail(request, slug):
    collection = get_object_or_404(Collection, slug=slug, is_active=True)
    products = collection.products.filter(is_active=True)

    context = {
        'collection': collection,
        'products': products,
    }

    return render(request, 'catalog/collection_detail.html', context)


@login_required
def manage_category(request):
    """
    Allows admin users to manage categories (CRUD operations).
    """
    categories = Category.objects.all().order_by('sort_order', 'name')
    return render(request, 'catalog/manage_category.html', {'categories': categories})

@login_required
def manage_collection(request):
    """
    Allows admin users to manage collections (CRUD operations).
    """
    collections = Collection.objects.all().order_by('sort_order', 'name')
    return render(request, 'catalog/manage_collection.html', {'collections': collections})
