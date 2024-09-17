from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import wishlist, wishlistItem
from products.models import Product
from django.contrib import messages

@login_required
def wishlist_list(request):
    """
    Displays a list of all wishlists for the logged-in user.
    """
    wishlists = wishlist.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'wishlist/wishlist_list.html', {'wishlists': wishlists})

@login_required
def wishlist_detail(request, wishlist_id):
    """
    Displays the details of a specific wishlist, including its items.
    """
    wishlist = get_object_or_404(wishlist, id=wishlist_id, user=request.user)
    items = wishlist.items.all().order_by('-added_at')
    return render(request, 'wishlist/wishlist_detail.html', {'wishlist': wishlist, 'items': items})

@login_required
def add_to_wishlist(request, product_id):
    """
    Adds a product to the user's wishlist.
    """
    product = get_object_or_404(Product, id=product_id)

    if request.method == 'POST':
        wishlist, created = wishlist.objects.get_or_create(user=request.user, name='My wishlist')
        wishlist_item, item_created = wishlistItem.objects.get_or_create(wishlist=wishlist, product=product)

        wishlist_item.quantity_desired = int(request.POST.get('quantity', wishlist_item.quantity_desired))
        wishlist_item.priority = int(request.POST.get('priority', wishlist_item.priority))
        wishlist_item.notes = request.POST.get('notes', wishlist_item.notes)
        wishlist_item.save()

        messages.success(request, f'{product.name} has been added/updated in your wishlist.')
        return redirect('wishlist_detail', wishlist_id=wishlist.id)

    # If request is GET, redirect to product detail page using the product's slug
    messages.error(request, 'Invalid request method.')
    return redirect('products:product_detail', slug=product.slug)


@login_required
def remove_from_wishlist(request, wishlist_item_id):
    """
    Removes an item from the user's wishlist.
    """
    wishlist_item = get_object_or_404(wishlistItem, id=wishlist_item_id, wishlist__user=request.user)
    wishlist_item.delete()
    return redirect('wishlist_detail', wishlist_id=wishlist_item.wishlist.id)
