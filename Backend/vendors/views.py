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
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ObjectDoesNotExist

class VendorLoginViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    serializer_class = VendorLoginSerializer

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(request, phone_number=serializer.validated_data['phone_number'], password=serializer.validated_data['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            login(request, user)
            try:
                profile = VendorProfile.objects.get(user=user)
            except VendorProfile.DoesNotExist:
                return Response({'error': 'Vendor profile does not exist'}, status=status.HTTP_404_NOT_FOUND)
            
            analytics = VendorAnalytics.objects.filter(vendor=profile).first()
            return Response({
                'user': {'username': user.username, 'email': user.email, 'phone_number': user.phone_number, 'id': user.id},
                'profile': VendorProfileSerializer(profile).data,
                'analytics': VendorAnalyticsSerializer(analytics).data if analytics else {},
                'token': {'access': str(refresh.access_token), 'refresh': str(refresh)}
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

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
