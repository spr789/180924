from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, authenticate, logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import CustomUser, UserProfile, Address
from .serializers import (
    CustomUserCreationSerializer, CustomUserSerializer,
    CustomUserUpdateSerializer, UserProfileSerializer, AddressSerializer
)
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken

# Register API View
class RegisterAPIView(APIView):
    def post(self, request):
        serializer = CustomUserCreationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)  # Automatically log in the user after registration
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login API View
class LoginAPIView(APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        password = request.data.get('password')

        user = authenticate(request, phone_number=phone_number, password=password)

        if user is not None:
            login(request, user)
            # Generate token
            token = RefreshToken.for_user(user)
            return Response({
                'token': str(token.access_token),  # Include the token in the response
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid phone number or password'}, status=status.HTTP_400_BAD_REQUEST)

# Logout API View
@permission_classes([IsAuthenticated])
class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

# User Profile API View
@permission_classes([IsAuthenticated])
class UserProfileAPIView(APIView):
    def get(self, request):
        user = request.user
        profile, created = UserProfile.objects.get_or_create(user=user)
        addresses = Address.objects.filter(user=user)

        user_serializer = CustomUserSerializer(user)
        profile_serializer = UserProfileSerializer(profile)
        addresses_serializer = AddressSerializer(addresses, many=True)

        return Response({
            'user': user_serializer.data,
            'profile': profile_serializer.data,
            'addresses': addresses_serializer.data
        })

# Update Profile API View
@permission_classes([IsAuthenticated])
class UpdateProfileAPIView(APIView):
    def post(self, request):
        user = request.user
        profile, created = UserProfile.objects.get_or_create(user=user)
        user_serializer = CustomUserUpdateSerializer(user, data=request.data)
        profile_serializer = UserProfileSerializer(profile, data=request.data)

        if user_serializer.is_valid() and profile_serializer.is_valid():
            user_serializer.save()
            profile_serializer.save()
            return Response({'message': 'Profile updated successfully'})
        return Response({
            'user_errors': user_serializer.errors,
            'profile_errors': profile_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

# Manage Addresses API View (Get All Addresses)
@permission_classes([IsAuthenticated])
class ManageAddressesAPIView(APIView):
    def get(self, request):
        addresses = Address.objects.filter(user=request.user)
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data)

# Add Address API View
@permission_classes([IsAuthenticated])
class AddAddressAPIView(APIView):
    def post(self, request):
        serializer = AddressSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({'message': 'Address added successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update Address API View
@permission_classes([IsAuthenticated])
class UpdateAddressAPIView(APIView):
    def post(self, request, pk):
        address = get_object_or_404(Address, pk=pk, user=request.user)
        serializer = AddressSerializer(address, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Address updated successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete Address API View
@permission_classes([IsAuthenticated])
class DeleteAddressAPIView(APIView):
    def delete(self, request, pk):
        address = get_object_or_404(Address, pk=pk, user=request.user)
        address.delete()
        return Response({'message': 'Address deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
