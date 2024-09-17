from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Payment, PaymentMethod, Refund
from orders.models import Order

@login_required
def payment_methods_list(request):
    """
    Displays a list of all available payment methods.
    """
    payment_methods = PaymentMethod.objects.filter(is_active=True).order_by('name')
    return render(request, 'payments/payment_methods_list.html', {'payment_methods': payment_methods})

@login_required
def make_payment(request, order_id):
    """
    Allows the user to make a payment for a specific order.
    """
    order = get_object_or_404(Order, id=order_id, user=request.user)
    payment_methods = PaymentMethod.objects.filter(is_active=True)

    if request.method == 'POST':
        payment_method = get_object_or_404(PaymentMethod, id=request.POST.get('payment_method'))
        payment = Payment.objects.create(
            order=order,
            user=request.user,
            payment_method=payment_method,
            amount=order.grand_total,
            transaction_id='TRANSACTION_ID',  # Generate this through your payment gateway
            status='completed',  # Update this based on payment gateway response
        )
        payment.save()

        # Update order status to processed/paid
        order.status = 'processed'
        order.save()

        return redirect('order_detail', order_id=order.id)

    return render(request, 'payments/make_payment.html', {'order': order, 'payment_methods': payment_methods})

@login_required
def payment_detail(request, payment_id):
    """
    Displays the details of a specific payment.
    """
    payment = get_object_or_404(Payment, id=payment_id, user=request.user)
    return render(request, 'payments/payment_detail.html', {'payment': payment})

@login_required
def request_refund(request, payment_id):
    """
    Allows the user to request a refund for a specific payment.
    """
    payment = get_object_or_404(Payment, id=payment_id, user=request.user)
    
    if request.method == 'POST':
        reason = request.POST.get('reason', 'No reason provided')
        refund = Refund.objects.create(
            payment=payment,
            amount=payment.amount,
            reason=reason,
            status='pending'  # Initially set to pending, process it later
        )
        refund.save()

        # Update payment status to refunded if processed immediately
        payment.status = 'refunded'
        payment.refunded_at = refund.processed_at
        payment.save()

        return redirect('payment_detail', payment_id=payment.id)

    return render(request, 'payments/request_refund.html', {'payment': payment})
