from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Shipment, ShippingMethod
from orders.models import Order
from vendors.models import VendorProfile

@login_required
def shipping_methods_list(request):
    """
    Displays a list of all available shipping methods.
    """
    shipping_methods = shippingMethod.objects.filter(active=True).order_by('name')
    return render(request, 'shipping/shipping_methods_list.html', {'shipping_methods': shipping_methods})

@login_required
def create_shipment(request, order_id):
    """
    Allows the vendor to create a shipment for a specific order.
    """
    order = get_object_or_404(Order, id=order_id)
    vendor = get_object_or_404(VendorProfile, user=request.user)

    if request.method == 'POST':
        shipping_method = get_object_or_404(shippingMethod, id=request.POST.get('shipping_method'))
        shipment = Shipment.objects.create(
            order=order,
            vendor=vendor,
            shipping_method=shipping_method,
            tracking_number=request.POST.get('tracking_number', ''),
            shipped_at=request.POST.get('shipped_at', None),
        )
        shipment.save()

        # Update order status to shipped
        order.status = 'shipped'
        order.save()

        return redirect('shipment_detail', shipment_id=shipment.id)

    shipping_methods = shippingMethod.objects.filter(active=True)
    return render(request, 'shipping/create_shipment.html', {'order': order, 'shipping_methods': shipping_methods})

@login_required
def shipment_detail(request, shipment_id):
    """
    Displays the details of a specific shipment.
    """
    shipment = get_object_or_404(Shipment, id=shipment_id, vendor__user=request.user)
    shipment_items = shipment.items.all()
    return render(request, 'shipping/shipment_detail.html', {'shipment': shipment, 'shipment_items': shipment_items})

@login_required
def track_shipment(request, tracking_number):
    """
    Allows the customer to track the status of their shipment using the tracking number.
    """
    shipment = get_object_or_404(Shipment, tracking_number=tracking_number)
    return render(request, 'shipping/track_shipment.html', {'shipment': shipment})
