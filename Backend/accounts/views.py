from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import CustomUser, UserProfile, Address, UserActivity, GuestUser
from .serializers import (
    CustomUserSerializer, CustomUserCreationSerializer, CustomUserUpdateSerializer,
    UserProfileSerializer, AddressSerializer, GuestUserSerializer
)
from orders.models import Order
from django.contrib.auth import authenticate, login, logout  # Add this import
from rest_framework.permissions import AllowAny  # Add this import



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

# API endpoint for user registration
class RegisterViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = CustomUserCreationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            UserActivity.objects.create(user=user, activity='User Registration', 
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT'))
            return Response({'message': 'Registration successful.'}, status=201)
        return Response(serializer.errors, status=400)

# API endpoint for user login
from rest_framework_simplejwt.tokens import RefreshToken

class LoginViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]  # Allow access without authentication

    def create(self, request):
        phone_number = request.data.get('phone_number')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(request, phone_number=phone_number, password=password)
        if user:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Log user activity
            UserActivity.objects.create(
                user=user,
                activity='Login',
                successful=True,
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT')
            )

            # Login the user (if session-based features are required)
            login(request, user)

            # Prepare response
            return Response({
                'message': 'Login successful.',
                'user': {
                    'id': user.id,
                    'phone_number': user.phone_number,
                    'email': user.email,
                    'is_vendor': user.is_vendor,
                    'is_customer': user.is_customer,
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': access_token
                }
            }, status=200)
        
        # If authentication fails
        return Response({'error': 'Invalid credentials'}, status=400)

# API endpoint for user logout
class LogoutViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        UserActivity.objects.create(user=request.user, activity='Logout',
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT'))
        logout(request)
        return Response({'message': 'Logout successful.'}, status=200)

