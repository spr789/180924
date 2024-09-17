from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Product, ProductImage, ProductReview, ProductSpecification, BulkUpload
from .forms import ProductForm, ProductImageForm, ProductReviewForm, BulkUploadForm
from django.views.decorators.http import require_POST
from django.utils.text import slugify
from django.db import IntegrityError

def product_list(request):
    """
    Displays a list of all active products.
    """
    products = Product.objects.filter(is_active=True, status='approved').order_by('name')
    return render(request, 'products/product_list.html', {'products': products})

def product_detail(request, slug):
    """
    Displays the details of a specific product, including images and reviews.
    """
    product = get_object_or_404(Product, slug=slug, is_active=True, status='approved')
    images = product.images.all()
    reviews = product.reviews.all().order_by('-created_at')
    specifications = product.specifications.all()
    return render(request, 'products/product_detail.html', {
        'product': product,
        'images': images,
        'reviews': reviews,
        'specifications': specifications,
    })

@login_required
def manage_products(request):
    """
    Displays a list of products for the logged-in vendor to manage.
    """
    products = Product.objects.filter(vendor=request.user.vendor_profile).order_by('-created_at')
    return render(request, 'products/manage_products.html', {'products': products})


def generate_unique_slug(instance, new_slug=None):
    slug = new_slug or slugify(instance.name)
    Klass = instance.__class__
    qs_exists = Klass.objects.filter(slug=slug).exists()
    if qs_exists:
        # If slug already exists, append a counter to make it unique
        new_slug = f"{slug}-{Klass.objects.count()}"
        return generate_unique_slug(instance, new_slug=new_slug)
    return slug


@login_required
def add_product(request):
    """
    Allows a vendor to add a new product.
    """
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        image_form = ProductImageForm(request.POST, request.FILES)
        
        if form.is_valid() and image_form.is_valid():
            product = form.save(commit=False)
            
            # Automatically assign the vendor
            product.vendor = request.user.vendor_profile

            # Set default values for other required fields
            product.status = 'pending'  # Set product status to pending approval
            product.average_rating = 0.0  # Default rating
            product.rating_count = 0  # Default rating count

            # Generate a unique slug for the product
            product.slug = generate_unique_slug(product)
            
            try:
                product.save()
                
                # Save the product image
                product_image = image_form.save(commit=False)
                product_image.product = product
                product_image.save()

                return redirect('products:manage_products')
            except IntegrityError:
                form.add_error(None, "An error occurred while saving the product. Please try again.")
    else:
        form = ProductForm()
        image_form = ProductImageForm()

    return render(request, 'products/add_product.html', {'form': form, 'image_form': image_form})


@login_required
def edit_product(request, product_id):
    """
    Allows a vendor to edit an existing product.
    """
    product = get_object_or_404(Product, id=product_id, vendor=request.user.vendor_profile)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            return redirect('products:manage_products')
    else:
        form = ProductForm(instance=product)
    return render(request, 'products/edit_product.html', {'form': form})

@login_required
def delete_product(request, product_id):
    """
    Allows a vendor to delete an existing product.
    """
    product = get_object_or_404(Product, id=product_id, vendor=request.user.vendor_profile)
    if request.method == 'POST':
        product.delete()
        return redirect('manage_products')
    return render(request, 'products/delete_product_confirm.html', {'product': product})

@login_required
def bulk_upload_products(request):
    """
    Allows a vendor to bulk upload products via a CSV or Excel file.
    """
    if request.method == 'POST':
        form = BulkUploadForm(request.POST, request.FILES)
        if form.is_valid():
            bulk_upload = form.save(commit=False)
            bulk_upload.vendor = request.user.vendor_profile
            bulk_upload.save()
            # Trigger background processing of the file here
            return redirect('manage_products')
    else:
        form = BulkUploadForm()
    
    return render(request, 'products/bulk_upload.html', {'form': form})

@login_required
def add_product_image(request, product_id):
    """
    Allows a vendor to add an image to a product.
    """
    product = get_object_or_404(Product, id=product_id, vendor=request.user.vendor_profile)
    if request.method == 'POST':
        form = ProductImageForm(request.POST, request.FILES)
        if form.is_valid():
            product_image = form.save(commit=False)
            product_image.product = product
            product_image.save()
            return redirect('edit_product', product_id=product.id)
    else:
        form = ProductImageForm()
    return render(request, 'products/add_product_image.html', {'form': form, 'product': product})

def add_review(request, product_id):
    """
    Allows a customer to add a review to a product.
    """
    product = get_object_or_404(Product, id=product_id, status='approved')
    if request.method == 'POST':
        form = ProductReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.product = product
            review.customer = request.user
            review.save()
            return redirect('product_detail', slug=product.slug)
    else:
        form = ProductReviewForm()
    return render(request, 'products/add_review.html', {'form': form, 'product': product})
