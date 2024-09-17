from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, authenticate
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import VendorProfile, VendorOrder, VendorShipment, VendorPayout, VendorNotification, VendorAnalytics
from .serializers import (
    VendorProfileSerializer, VendorOrderSerializer, VendorShipmentSerializer, 
    VendorPayoutSerializer, VendorNotificationSerializer, VendorAnalyticsSerializer, 
    VendorRegisterSerializer, VendorLoginSerializer
)

# Vendor Registration API
class VendorRegisterAPIView(APIView):
    def post(self, request):
        serializer = VendorRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_vendor = True
            user.save()
            login(request, user)
            VendorProfile.objects.create(user=user)
            return Response({'message': 'Vendor registration successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vendor Login API
class VendorLoginAPIView(APIView):
    def post(self, request):
        serializer = VendorLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(request, phone_number=serializer.validated_data['phone_number'], password=serializer.validated_data['password'])
            if user and user.is_vendor:
                login(request, user)
                return Response({'message': 'Vendor login successful'}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid credentials or not a vendor'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vendor Profile API (GET and POST)
class VendorProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        vendor = get_object_or_404(VendorProfile, user=request.user)
        serializer = VendorProfileSerializer(vendor)
        return Response(serializer.data)

    def post(self, request):
        vendor = get_object_or_404(VendorProfile, user=request.user)
        serializer = VendorProfileSerializer(vendor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Vendor profile updated successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vendor Orders API (GET)
class VendorOrdersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        vendor = get_object_or_404(VendorProfile, user=request.user)
        orders = VendorOrder.objects.filter(vendor=vendor)
        serializer = VendorOrderSerializer(orders, many=True)
        return Response(serializer.data)

# Vendor Shipments API (GET)
class VendorShipmentsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        vendor = get_object_or_404(VendorProfile, user=request.user)
        shipments = VendorShipment.objects.filter(vendor=vendor)
        serializer = VendorShipmentSerializer(shipments, many=True)
        return Response(serializer.data)

# Vendor Payouts API (GET)
class VendorPayoutsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        vendor = get_object_or_404(VendorProfile, user=request.user)
        payouts = VendorPayout.objects.filter(vendor=vendor)
        serializer = VendorPayoutSerializer(payouts, many=True)
        return Response(serializer.data)

# Vendor Notifications API (GET and Mark as Read)
class VendorNotificationsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        vendor = get_object_or_404(VendorProfile, user=request.user)
        notifications = VendorNotification.objects.filter(vendor=vendor)
        serializer = VendorNotificationSerializer(notifications, many=True)
        return Response(serializer.data)

class MarkNotificationAsReadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, notification_id):
        notification = get_object_or_404(VendorNotification, id=notification_id, vendor__user=request.user)
        notification.read = True
        notification.save()
        return Response({'message': 'Notification marked as read'})

# Vendor Analytics API (GET)
class VendorAnalyticsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        vendor = get_object_or_404(VendorProfile, user=request.user)
        analytics = get_object_or_404(VendorAnalytics, vendor=vendor)
        serializer = VendorAnalyticsSerializer(analytics)
        return Response(serializer.data)
