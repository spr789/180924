from rest_framework import serializers
from .models import VendorProfile, VendorOrder, VendorShipment, VendorPayout, VendorNotification, VendorAnalytics
from accounts.models import CustomUser

# Serializer for vendor registration
class VendorRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'phone_number', 'email', 'password', 'password2']

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

# Serializer for vendor login
class VendorLoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField(write_only=True)

# Vendor Profile Serializer
class VendorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorProfile
        fields = ['business_name', 'business_address', 'website_url', 'verification_status']

# Vendor Order Serializer
class VendorOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorOrder
        fields = ['order', 'product', 'quantity', 'price', 'status', 'created_at']

# Vendor Shipment Serializer
class VendorShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorShipment
        fields = ['shipment', 'order', 'shipped_date', 'delivery_date', 'tracking_number', 'status']

# Vendor Payout Serializer
class VendorPayoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorPayout
        fields = ['amount', 'payout_date', 'status']

# Vendor Notification Serializer
class VendorNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorNotification
        fields = ['message', 'created_at', 'read']

# Vendor Analytics Serializer
class VendorAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorAnalytics
        fields = ['total_sales', 'total_orders', 'total_revenue', 'last_updated']
