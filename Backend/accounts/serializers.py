from rest_framework import serializers
from .models import CustomUser, UserProfile, Address

# Serializer for CustomUser registration and profile details
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone_number', 'is_vendor', 'is_customer']
        extra_kwargs = {
            'username': {'required': True},
            'phone_number': {'required': True},
        }

# Serializer for creating a new user (registration)
class CustomUserCreationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone_number', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    # Custom validation to check if passwords match
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords must match.")
        return data

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            phone_number=validated_data['phone_number'],
            email=validated_data.get('email'),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

# Serializer for updating an existing user's profile
class CustomUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone_number']

# Serializer for UserProfile model
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_picture', 'date_of_birth', 'gender', 'bio', 'website_url', 'timezone']

# Serializer for Address model
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'address_line_1', 'address_line_2', 'landmark', 'city', 'state',
            'postal_code', 'country', 'latitude', 'longitude', 'address_type', 'is_default', 'address_verified'
        ]

    # Custom validation to prevent duplicate addresses
    def validate(self, data):
        user = self.context['request'].user
        if Address.objects.filter(
            user=user,
            address_line_1=data['address_line_1'],
            city=data['city'],
            state=data['state'],
            postal_code=data['postal_code'],
            country=data['country']
        ).exists():
            raise serializers.ValidationError("This address already exists for the user.")
        return data
