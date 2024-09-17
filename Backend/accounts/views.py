from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import CustomUserCreationForm, UserProfileForm, CustomUserChangeForm, AddressForm
from .models import CustomUser, UserProfile, Address
from orders.models import Order
from django.contrib import messages

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Automatically log in the user after registration
            messages.success(request, 'Registration successful. You are now logged in.')
            return redirect('home')  # Redirect to a desired URL after successful registration
        else:
            # If the form is invalid, show error messages
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}")
    else:
        form = CustomUserCreationForm()

    return render(request, 'accounts/register.html', {'form': form})


# Login View
def login_view(request):
    if request.method == 'POST':
        # Authenticate using phone number
        phone_number = request.POST.get('phone_number')
        password = request.POST.get('password')

        user = authenticate(request, phone_number=phone_number, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid phone number or password')

    return render(request, 'accounts/login.html')

# Logout View
@login_required
def logout_view(request):
    logout(request)
    return render(request, 'accounts/login.html')

# Profile View
@login_required
def profile_view(request):
    user = request.user
    profile, created = UserProfile.objects.get_or_create(user=user)
    orders = Order.objects.filter(user=user)
    addresses = Address.objects.filter(user=request.user)
    return render(request, 'accounts/profile.html', {
        'user': user,
        'profile': profile,
        'orders': orders,
        'addresses': addresses
    })

# Update Profile View
@login_required
def update_profile_view(request):
    user = request.user
    profile, created = UserProfile.objects.get_or_create(user=user)
    if request.method == 'POST':
        user_form = CustomUserChangeForm(request.POST, instance=user)
        profile_form = UserProfileForm(request.POST, request.FILES, instance=profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, 'Your profile was successfully updated!')
            return redirect('accounts:profile')
    else:
        user_form = CustomUserChangeForm(instance=user)
        profile_form = UserProfileForm(instance=profile)
    
    return render(request, 'accounts/update_profile.html', {
        'user_form': user_form,
        'profile_form': profile_form,
    })

# Manage Addresses View
@login_required
def manage_addresses_view(request):
    addresses = Address.objects.filter(user=request.user)
    return render(request, 'accounts/manage_addresses.html', {'addresses': addresses})

# Add Address View
@login_required
def add_address_view(request):
    if request.method == 'POST':
        form = AddressForm(request.POST)
        form.instance.user = request.user  # Ensure the form has the user instance for validation
        if form.is_valid():
            form.save()
            messages.success(request, 'Address added successfully!')
            return redirect('accounts:manage_addresses')
        else:
            # If the form is invalid, errors will be displayed automatically in the template
            messages.error(request, 'There was an error adding your address.')
    else:
        form = AddressForm()

    return render(request, 'accounts/add_address.html', {'form': form})

# Update Address View
@login_required
def update_address_view(request, pk):
    address = get_object_or_404(Address, pk=pk, user=request.user)
    if request.method == 'POST':
        form = AddressForm(request.POST, instance=address)
        if form.is_valid():
            form.save()
            messages.success(request, 'Address updated successfully!')
            return redirect('manage_addresses')
    else:
        form = AddressForm(instance=address)
    return render(request, 'accounts/update_address.html', {'form': form})

# Delete Address View
@login_required
def delete_address_view(request, pk):
    address = get_object_or_404(Address, pk=pk, user=request.user)
    if request.method == 'POST':
        address.delete()
        messages.success(request, 'Address deleted successfully!')
        return redirect('manage_addresses')
    return render(request, 'accounts/delete_address.html', {'address': address})
