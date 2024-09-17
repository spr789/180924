from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.urls import reverse_lazy
from django.views.generic import CreateView
from .models import VendorProfile, VendorOrder, VendorShipment, VendorAnalytics, VendorPayout, VendorNotification
from .forms import VendorProfileForm, VendorOrderForm, VendorShipmentForm, VendorPayoutForm, VendorNotificationForm
from accounts.forms import CustomUserCreationForm
from django.views.generic import View
from django.contrib import messages



# Vendor Registration View
class VendorRegisterView(CreateView):
    form_class = CustomUserCreationForm
    template_name = 'vendors/vendor_register.html'
    success_url = reverse_lazy('vendors:vendor_dashboard')

    def form_valid(self, form):
        # Save the user
        user = form.save()
        user.is_vendor = True  # Set the user as a vendor
        user.save()
        
        # Automatically log in the vendor after registration
        login(self.request, user)
        
        # Create the vendor profile associated with the new user
        VendorProfile.objects.create(user=user)
        
        return redirect(reverse_lazy('vendors:vendor_dashboard'))

@login_required
def vendor_dashboard(request):
    """
    Displays the vendor dashboard with key metrics, orders, shipments, and links to product management.
    """
    # Check if the VendorProfile exists for the logged-in user
    try:
        vendor = VendorProfile.objects.get(user=request.user)
    except VendorProfile.DoesNotExist:
        messages.error(request, "No vendor profile found. Please complete your vendor registration.")
        return redirect('vendors:vendor_register')  # Redirect to the vendor registration page or another appropriate page

    # Fetching analytics data
    analytics = VendorAnalytics

    # Fetching unread notifications
    notifications = vendor.notifications.filter(read=False)

    # Fetching vendor orders
    orders = VendorOrder.objects.filter(vendor=vendor).order_by('-created_at')

    # Fetching vendor shipments
    shipments = VendorShipment.objects.filter(vendor=vendor).order_by('-shipped_date')

    context = {
        'vendor': vendor,
        'analytics': analytics,
        'notifications': notifications,
        'orders': orders,
        'shipments': shipments,
    }
    return render(request, 'vendors/vendor_dashboard.html', context)


@login_required
def vendor_profile(request):
    """
    Allows vendors to view and update their profile information.
    """
    vendor = get_object_or_404(VendorProfile, user=request.user)
    if request.method == 'POST':
        form = VendorProfileForm(request.POST, instance=vendor)
        if form.is_valid():
            form.save()
            return redirect('vendors:vendor_profile')
    else:
        form = VendorProfileForm(instance=vendor)
    return render(request, 'vendor/profile.html', {'form': form})

@login_required
def vendor_orders(request):
    """
    Displays the list of orders associated with the vendor.
    """
    vendor = get_object_or_404(VendorProfile, user=request.user)
    orders = VendorOrder.objects.filter(vendor=vendor).order_by('-created_at')
    return render(request, 'vendor/orders.html', {'orders': orders})

@login_required
def vendor_order_detail(request, order_id):
    """
    Displays the details of a specific order for the vendor.
    """
    vendor = get_object_or_404(VendorProfile, user=request.user)
    order = get_object_or_404(VendorOrder, id=order_id, vendor=vendor)
    return render(request, 'vendor/order_detail.html', {'order': order})

@login_required
def vendor_shipments(request):
    """
    Displays the list of shipments associated with the vendor.
    """
    vendor = get_object_or_404(VendorProfile, user=request.user)
    shipments = VendorShipment.objects.filter(vendor=vendor).order_by('-shipped_date')
    return render(request, 'vendor/shipments.html', {'shipments': shipments})

@login_required
def vendor_payouts(request):
    """
    Displays the list of payouts to the vendor.
    """
    vendor = get_object_or_404(VendorProfile, user=request.user)
    payouts = VendorPayout.objects.filter(vendor=vendor).order_by('-payout_date')
    return render(request, 'vendor/payouts.html', {'payouts': payouts})

@login_required
def vendor_notifications(request):
    """
    Displays vendor-specific notifications.
    """
    vendor = get_object_or_404(VendorProfile, user=request.user)
    notifications = VendorNotification.objects.filter(vendor=vendor).order_by('-created_at')
    return render(request, 'vendor/notifications.html', {'notifications': notifications})

@login_required
def mark_notification_as_read(request, notification_id):
    """
    Marks a specific notification as read.
    """
    notification = get_object_or_404(VendorNotification, id=notification_id, vendor__user=request.user)
    notification.read = True
    notification.save()
    return redirect('vendor_notifications')


class VendorLoginView(View):
    template_name = 'vendors/vendor_login.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        phone_number = request.POST.get('phone_number')
        password = request.POST.get('password')

        # Authenticate the vendor using phone number and password
        user = authenticate(request, phone_number=phone_number, password=password)

        if user is not None and user.is_vendor:
            login(request, user)
            return redirect('vendors:vendor_dashboard')
        else:
            messages.error(request, 'Invalid phone number or password.')
            return render(request, self.template_name)