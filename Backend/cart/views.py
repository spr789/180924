from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import cart as CartModel, cartItem
from products.models import Product
from accounts.models import CustomUser, Address
from orders.models import Order, OrderItem
from django.views.decorators.http import require_POST, require_http_methods
from datetime import datetime
from .forms import CheckoutForm
from django.urls import reverse
from payments.models import Payment 
import logging

logger = logging.getLogger(__name__)

def cart_view(request):
    """
    Displays the user's current cart with all items.
    """
    if request.user.is_authenticated:
        user_cart, created = CartModel.objects.get_or_create(user=request.user, is_active=True)
    else:
        # Handle guest cart using session ID
        session_id = request.session.session_key
        if not session_id:
            request.session.create()
            session_id = request.session.session_key
        user_cart, created = CartModel.objects.get_or_create(session_id=session_id, is_active=True)

    items = user_cart.items.all()
    total_price = user_cart.get_total_price()
    return render(request, 'cart/cart.html', {'cart': user_cart, 'items': items, 'total_price': total_price})

@require_http_methods(["POST", "GET"])
def add_to_cart(request, product_id):
    """
    Adds a product to the user's cart.
    """
    product = get_object_or_404(Product, id=product_id)
    
    if request.user.is_authenticated:
        user_cart, created = CartModel.objects.get_or_create(user=request.user, is_active=True)
    else:
        # Handle guest cart using session ID
        session_id = request.session.session_key
        if not session_id:
            request.session.create()
            session_id = request.session.session_key
        user_cart, created = CartModel.objects.get_or_create(session_id=session_id, is_active=True)
    
    cart_item, item_created = cartItem.objects.get_or_create(cart=user_cart, product=product)
    cart_item.quantity += int(request.POST.get('quantity', 1)) if request.method == "POST" else 1
    cart_item.save()

    user_cart.last_activity = cart_item.updated_at
    user_cart.save()

    return redirect('cart:cart_view')

def update_cart_item(request, cart_item_id):
    """
    Updates the quantity of a specific item in the cart.
    """
    cart_item = get_object_or_404(cartItem, id=cart_item_id)
    cart_item.quantity = int(request.POST.get('quantity', cart_item.quantity))
    cart_item.save()

    cart_item.cart.last_activity = cart_item.updated_at
    cart_item.cart.save()

    return redirect('cart:cart_view')

def remove_from_cart(request, cart_item_id):
    """
    Removes an item from the user's cart.
    """
    cart_item = get_object_or_404(cartItem, id=cart_item_id)
    cart_item.delete()

    cart_item.cart.last_activity = cart_item.updated_at
    cart_item.cart.save()

    return redirect('cart:cart_view')

def abandoned_cart_reminder(request):
    """
    Sends a reminder email for abandoned carts.
    (Assumes this is called by a scheduled task or cron job)
    """
    abandoned_carts = CartModel.objects.filter(is_abandoned=True, reminder_sent=False)
    for cart in abandoned_carts:
        # Logic to send reminder email
        cart.reminder_sent = True
        cart.reminder_sent_at = datetime.now()
        cart.save()

    return redirect('cart:cart_view')

def checkout_view(request):
    # Get the cart for the authenticated user or the session-based cart for guests
    if request.user.is_authenticated:
        cart = get_object_or_404(CartModel, user=request.user, is_active=True)
    else:
        session_id = request.session.session_key
        cart = get_object_or_404(CartModel, session_id=session_id, is_active=True)

    if request.method == 'POST':
        form = CheckoutForm(request.POST)
        if form.is_valid():
            # Extract form data
            email = form.cleaned_data['email']
            address = form.cleaned_data['address']
            city = form.cleaned_data['city']
            state = form.cleaned_data['state']
            zip_code = form.cleaned_data['postal_code']
            payment_method = form.cleaned_data.get('payment_method')  # Correctly capture the payment method
            
            # Determine the user, creating a guest user if necessary
            if request.user.is_authenticated:
                user = request.user
            else:
                user, created = CustomUser.objects.get_or_create(email=email)
                if created:
                    user.username = email.split('@')[0]
                    user.set_unusable_password()  # Set an unusable password for the guest user
                    user.save()

            # Save the shipping address
            shipping_address = Address.objects.create(
                user=user,
                address_line_1=address,
                city=city,
                state=state,
                postal_code=zip_code,
                address_type='shipping',
                is_default=True
            )

            # Create the order
            order = Order.objects.create(
                user=user,
                shipping_address=shipping_address,
                total_amount=cart.get_total_price(),
            )

            # Add items from the cart to the order
            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.discounted_price or item.product.original_price,
                    total_price=item.get_total_price()
                )

            # Mark the cart as inactive after purchase
            cart.is_active = False
            cart.save()

            # Handle payment method redirection
            if payment_method == 'Online':
                logger.debug("Redirecting to online payment page.")
                return redirect(reverse('payments:online_payment', args=[order.id]))
            else:
                logger.debug("Redirecting to order success page.")
                return redirect(reverse('orders:order_success', args=[order.id]))

    else:
        form = CheckoutForm(initial={'email': request.user.email if request.user.is_authenticated else ''})

    return render(request, 'cart/checkout.html', {'cart': cart, 'form': form})

@require_POST
def buy_now(request, product_id):
    """
    Adds a product to the cart and redirects to the checkout page.
    """
    product = get_object_or_404(Product, id=product_id)

    if request.user.is_authenticated:
        cart, created = CartModel.objects.get_or_create(user=request.user, is_active=True)
    else:
        session_id = request.session.session_key
        if not session_id:
            request.session.create()
            session_id = request.session.session_key
        cart, created = CartModel.objects.get_or_create(session_id=session_id, is_active=True)

    cart_item, item_created = cartItem.objects.get_or_create(cart=cart, product=product)
    cart_item.quantity += 1
    cart_item.save()

    cart.last_activity = cart_item.updated_at
    cart.save()

    return redirect('cart:checkout_view')
