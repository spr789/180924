from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .forms import CustomUserCreationForm, UserProfileForm, CustomUserChangeForm, AddressForm
from .models import CustomUser, UserProfile, Address, UserActivity, GuestUser
from .serializers import (
    CustomUserSerializer, CustomUserCreationSerializer, CustomUserUpdateSerializer,
    UserProfileSerializer, AddressSerializer, GuestUserSerializer
)
from orders.models import Order

# ViewSets for API endpoints
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CustomUserCreationSerializer
        elif self.action in ['update', 'partial_update']:
            return CustomUserUpdateSerializer
        return CustomUserSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Address.objects.filter(user=self.request.user)
        return Address.objects.filter(guest_user__session_key=self.request.session.session_key)

class GuestUserViewSet(viewsets.ModelViewSet):
    queryset = GuestUser.objects.all()
    serializer_class = GuestUserSerializer

# Core authentication views
def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            UserActivity.objects.create(user=user, activity='User Registration', 
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT'))
            messages.success(request, 'Registration successful.')
            return redirect('home')
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        user = authenticate(request, phone_number=request.POST.get('phone_number'), 
                          password=request.POST.get('password'))
        if user:
            login(request, user)
            UserActivity.objects.create(user=user, activity='Login', successful=True,
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT'))
            return redirect('home')
        messages.error(request, 'Invalid credentials')
    return render(request, 'accounts/login.html')

@login_required
def logout_view(request):
    UserActivity.objects.create(user=request.user, activity='Logout',
        ip_address=request.META.get('REMOTE_ADDR'),
        user_agent=request.META.get('HTTP_USER_AGENT'))
    logout(request)
    return redirect('accounts:login')

# Profile management views
@login_required
def profile_view(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    orders = Order.objects.filter(user=request.user)
    addresses = Address.objects.filter(user=request.user).order_by('-is_default')
    return render(request, 'accounts/profile.html', 
                 {'profile': profile, 'orders': orders, 'addresses': addresses})

@login_required
def update_profile_view(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        user_form = CustomUserChangeForm(request.POST, instance=request.user)
        profile_form = UserProfileForm(request.POST, request.FILES, instance=profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            UserActivity.objects.create(user=request.user, activity='Profile Update',
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT'))
            messages.success(request, 'Profile updated successfully!')
            return redirect('accounts:profile')
    else:
        user_form = CustomUserChangeForm(instance=request.user)
        profile_form = UserProfileForm(instance=profile)
    return render(request, 'accounts/update_profile.html', 
                 {'user_form': user_form, 'profile_form': profile_form})

# Address management views
@login_required
def manage_addresses_view(request):
    addresses = Address.objects.filter(user=request.user).order_by('-is_default')
    return render(request, 'accounts/manage_addresses.html', {'addresses': addresses})

@login_required
def add_address_view(request):
    if request.method == 'POST':
        form = AddressForm(request.POST)
        form.instance.user = request.user
        if form.is_valid():
            form.save()
            UserActivity.objects.create(user=request.user, activity='Address Added',
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT'))
            messages.success(request, 'Address added successfully!')
            return redirect('accounts:manage_addresses')
    else:
        form = AddressForm()
    return render(request, 'accounts/add_address.html', {'form': form})

@login_required
def update_address_view(request, pk):
    address = get_object_or_404(Address, pk=pk, user=request.user)
    if request.method == 'POST':
        form = AddressForm(request.POST, instance=address)
        if form.is_valid():
            form.save()
            UserActivity.objects.create(user=request.user, activity='Address Updated',
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT'))
            return redirect('accounts:manage_addresses')
    else:
        form = AddressForm(instance=address)
    return render(request, 'accounts/update_address.html', {'form': form})

@login_required
def delete_address_view(request, pk):
    address = get_object_or_404(Address, pk=pk, user=request.user)
    if request.method == 'POST':
        UserActivity.objects.create(user=request.user, activity='Address Deleted',
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT'))
        address.delete()
        return redirect('accounts:manage_addresses')
    return render(request, 'accounts/delete_address.html', {'address': address})
