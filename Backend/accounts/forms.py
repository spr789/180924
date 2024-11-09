from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser, UserProfile, Address

# Custom user creation form
class CustomUserCreationForm(UserCreationForm):
    # Add a field for the username (which is the 'name' in this case)
    username = forms.CharField(label="Name", max_length=150, required=True)

    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'phone_number', 'email', 'password1', 'password2')
        error_messages = {
            'password_mismatch': "The two password fields didn't match.",
            'username': {
                'unique': "This username is already taken.",
            },
            'phone_number': {
                'unique': "This phone number is already registered.",
            },
        }

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data.get('email')
        user.phone_number = self.cleaned_data.get('phone_number')
        user.username = self.cleaned_data.get('username')  # Save the name as the username
        if commit:
            user.save()
        return user

# Custom user change form
class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = CustomUser
        fields = ('email', 'phone_number', 'is_vendor', 'is_customer', 'is_staff', 'is_superuser')

# UserProfile form
class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('profile_picture', 'date_of_birth', 'gender', 'bio', 'website_url', 'timezone')

# Address form
class AddressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = (
            'address_line_1', 'address_line_2', 'landmark', 'city', 'state',
            'postal_code', 'country', 'latitude', 'longitude', 'address_type', 'is_default'
        )

    def clean(self):
        cleaned_data = super().clean()
        address_line_1 = cleaned_data.get('address_line_1')
        address_line_2 = cleaned_data.get('address_line_2')
        city = cleaned_data.get('city')
        state = cleaned_data.get('state')
        postal_code = cleaned_data.get('postal_code')
        country = cleaned_data.get('country')
        
        # Get user or guest_user from instance
        user = self.instance.user
        guest_user = self.instance.guest_user

        # Check if the address already exists
        address_filter = {
            'address_line_1': address_line_1,
            'address_line_2': address_line_2,
            'city': city,
            'state': state,
            'postal_code': postal_code,
            'country': country
        }

        if user:
            address_filter['user'] = user
            if Address.objects.filter(**address_filter).exists():
                raise forms.ValidationError("This address already exists.")
            # Check address limit for registered users
            if user.addresses.count() >= 4:
                raise forms.ValidationError("You cannot have more than 3 addresses.")
        elif guest_user:
            address_filter['guest_user'] = guest_user
            if Address.objects.filter(**address_filter).exists():
                raise forms.ValidationError("This address already exists.")
            # Check address limit for guest users
            if guest_user.addresses.count() >= 2:
                raise forms.ValidationError("Guest users cannot have more than 1 address.")

        return cleaned_data
