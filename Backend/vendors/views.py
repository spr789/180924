from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import VendorProfile, VendorOrder, VendorShipment, VendorPayout, VendorNotification, VendorAnalytics
from .serializers import (
    VendorRegisterSerializer, VendorLoginSerializer, VendorProfileSerializer,
    VendorOrderSerializer, VendorShipmentSerializer, VendorPayoutSerializer,
    VendorNotificationSerializer, VendorAnalyticsSerializer
)
from accounts.models import CustomUser

class VendorRegisterViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = VendorRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"message": "Vendor registered successfully"}, status=status.HTTP_201_CREATED)

class VendorLoginViewSet(viewsets.ViewSet):
    serializer_class = VendorLoginSerializer

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Implement your authentication logic here
        return Response({"message": "Login successful"})

class VendorProfileViewSet(viewsets.ModelViewSet):
    queryset = VendorProfile.objects.all()
    serializer_class = VendorProfileSerializer
    permission_classes = [IsAuthenticated]

class VendorOrderViewSet(viewsets.ModelViewSet):
    queryset = VendorOrder.objects.all()
    serializer_class = VendorOrderSerializer
    permission_classes = [IsAuthenticated]

class VendorShipmentViewSet(viewsets.ModelViewSet):
    queryset = VendorShipment.objects.all()
    serializer_class = VendorShipmentSerializer
    permission_classes = [IsAuthenticated]

class VendorPayoutViewSet(viewsets.ModelViewSet):
    queryset = VendorPayout.objects.all()
    serializer_class = VendorPayoutSerializer
    permission_classes = [IsAuthenticated]

class VendorNotificationViewSet(viewsets.ModelViewSet):
    queryset = VendorNotification.objects.all()
    serializer_class = VendorNotificationSerializer
    permission_classes = [IsAuthenticated]

class VendorAnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = VendorAnalytics.objects.all()
    serializer_class = VendorAnalyticsSerializer
    permission_classes = [IsAuthenticated]
