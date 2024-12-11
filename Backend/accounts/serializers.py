from rest_framework import serializers
from .models import CustomUser, UserProfile, Address, GuestUser

# Serializer for UserProfile model
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_picture', 'date_of_birth', 'gender', 'bio', 'website_url', 'timezone']

# Serializer for CustomUser registration and profile details
class CustomUserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)  # Nested UserProfile

    class Meta:
        model = CustomUser
        fields = ['phone_number', 'email', 'is_vendor', 'is_customer', 'is_staff', 'is_superuser', 'profile']
        extra_kwargs = {
            'phone_number': {'required': True},
        }

# Serializer for creating a new user (registration)
class CustomUserCreationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'phone_number', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
            'phone_number': {'validators': [CustomUser.phone_regex]},
        }

    # Custom validation to check if passwords match
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords must match.")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = CustomUser(
            phone_number=validated_data['phone_number'],
            email=validated_data.get('email'),
        )
        user.set_password(validated_data['password'])
        user.save()
        
        # Create a UserProfile for the new user
        UserProfile.objects.get_or_create(user=user)
        
        return user

# Serializer for updating an existing user's profile
class CustomUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'phone_number']
        extra_kwargs = {
            'phone_number': {'validators': [CustomUser.phone_regex]},
        }

# Serializer for GuestUser model
class GuestUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuestUser
        fields = ['session_key', 'created_at', 'last_activity']
        read_only_fields = ['created_at', 'last_activity']

# Serializer for Address model
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'id', 'user', 'guest_user', 'address_line_1', 'address_line_2', 'landmark', 
            'city', 'state', 'postal_code', 'country', 'latitude', 'longitude', 
            'address_type', 'is_default', 'address_verified'
        ]
        read_only_fields = ['address_verified']

    def validate(self, data):
        user = data.get('user')
        guest_user = data.get('guest_user')

        # Ensure either user or guest_user is provided, but not both
        if user and guest_user:
            raise serializers.ValidationError("Cannot specify both user and guest user")
        if not user and not guest_user:
            raise serializers.ValidationError("Must specify either user or guest user")

        # Check address limits
        if user and Address.objects.filter(user=user).count() >= 4:
            raise serializers.ValidationError("Users cannot have more than 3 addresses")
        if guest_user and Address.objects.filter(guest_user=guest_user).count() >= 2:
            raise serializers.ValidationError("Guest users cannot have more than 1 address")

        # Check for duplicate addresses
        address_filter = {
            'address_line_1': data['address_line_1'],
            'city': data['city'],
            'state': data['state'],
            'postal_code': data['postal_code'],
            'country': data['country']
        }

        if user:
            address_filter['user'] = user
        else:
            address_filter['guest_user'] = guest_user

        if Address.objects.filter(**address_filter).exists():
            raise serializers.ValidationError("This address already exists")

        return data
