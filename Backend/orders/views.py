from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Order, OrderItem, OrderStatusHistory
from .forms import OrderForm
from cart.models import cart

@login_required
def order_list(request):
    """
    Displays a list of all orders for the logged-in user.
    """
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'orders/order_list.html', {'orders': orders})

@login_required
def order_detail(request, order_id):
    """
    Displays the details of a specific order.
    """
    order = get_object_or_404(Order, id=order_id, user=request.user)
    order_items = order.items.all()
    status_history = order.status_history.all().order_by('-changed_at')
    return render(request, 'orders/order_detail.html', {
        'order': order,
        'order_items': order_items,
        'status_history': status_history,
    })

@login_required
def create_order(request):
    """
    Creates a new order from the user's cart.
    """
    cart = get_object_or_404(cart, user=request.user, is_active=True)
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            order.user = request.user
            order.cart = cart
            order.total_amount = cart.get_total_price()
            order.grand_total = order.total_amount + order.shipping_cost - order.discount + order.tax
            order.save()

            # Create order items from cart items
            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.get_total_price(),
                    total_price=item.get_total_price(),
                )

            # Mark the cart as inactive
            cart.is_active = False
            cart.save()

            return redirect('order_detail', order_id=order.id)
    else:
        form = OrderForm()

    return render(request, 'orders/create_order.html', {'form': form, 'cart': cart})

@login_required
def cancel_order(request, order_id):
    """
    Allows the user to cancel an order that has not yet been shipped.
    """
    order = get_object_or_404(Order, id=order_id, user=request.user)
    if request.method == 'POST':
        if order.status == 'pending' or order.status == 'processed':
            order.status = 'canceled'
            order.save()

            # Record status change in history
            OrderStatusHistory.objects.create(
                order=order,
                status='canceled',
                changed_by=request.user,
                notes='Order canceled by customer'
            )

            return redirect('order_list')

    return render(request, 'orders/cancel_order_confirm.html', {'order': order})

@login_required
def track_order(request, order_id):
    """
    Allows the user to track the status of their order.
    """
    order = get_object_or_404(Order, id=order_id, user=request.user)
    status_history = order.status_history.all().order_by('-changed_at')
    return render(request, 'orders/track_order.html', {
        'order': order,
        'status_history': status_history,
    })

from django.shortcuts import render, get_object_or_404
from .models import Order

def order_success(request, order_id):
    """
    Displays the order success page after a successful checkout.
    """
    order = get_object_or_404(Order, id=order_id)
    return render(request, 'orders/order_success.html', {'order': order})
