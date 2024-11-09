from django.test import TestCase, Client
from django.urls import reverse
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.test import APITestCase
from .models import CustomUser, UserProfile, Address, GuestUser
from .serializers import CustomUserSerializer, UserProfileSerializer, AddressSerializer

class CustomUserTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = CustomUser.objects.create_user(
            username='testuser',
            phone_number='+1234567890', 
            password='testpass123'
        )

    def test_register_view(self):
        response = self.client.post(reverse('accounts:register'), {
            'username': 'testuser2',
            'phone_number': '+0987654321',
            'password1': 'testpass123',
            'password2': 'testpass123'
        })
        self.assertEqual(response.status_code, 302)
        self.assertTrue(CustomUser.objects.filter(phone_number='+0987654321').exists())

    def test_register_view_invalid_phone(self):
        response = self.client.post(reverse('accounts:register'), {
            'username': 'testuser3',
            'phone_number': 'invalid_phone',
            'password1': 'testpass123',
            'password2': 'testpass123'
        })
        self.assertEqual(response.status_code, 200)  # Returns form with errors
        self.assertFalse(CustomUser.objects.filter(phone_number='invalid_phone').exists())

    def test_register_view_password_mismatch(self):
        response = self.client.post(reverse('accounts:register'), {
            'username': 'testuser4',
            'phone_number': '+0987654321',
            'password1': 'testpass123',
            'password2': 'wrongpass123'
        })
        self.assertEqual(response.status_code, 200)  # Returns form with errors
        self.assertFalse(CustomUser.objects.filter(phone_number='+0987654321').exists())

    def test_login_view(self):
        response = self.client.post(reverse('accounts:login'), {
            'phone_number': '+1234567890',
            'password': 'testpass123'
        })
        self.assertEqual(response.status_code, 302)

    def test_login_view_invalid_credentials(self):
        response = self.client.post(reverse('accounts:login'), {
            'phone_number': '+1234567890',
            'password': 'wrongpass123'
        })
        self.assertEqual(response.status_code, 200)  # Returns form with errors

class UserProfileTests(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username='testuser',
            phone_number='+1234567890',
            password='testpass123'
        )
        self.profile = UserProfile.objects.create(user=self.user)

    def test_profile_creation(self):
        self.assertIsNotNone(self.profile)
        self.assertEqual(self.profile.user, self.user)

class AddressTests(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username='testuser',
            phone_number='+1234567890',
            password='testpass123'
        )
        self.address = Address.objects.create(
            user=self.user,
            street='123 Test St',
            city='Test City',
            state='TS',
            postal_code='12345'
        )

    def test_address_creation(self):
        self.assertEqual(self.address.street, '123 Test St')
        self.assertEqual(self.address.user, self.user)

    def test_address_validation(self):
        with self.assertRaises(ValidationError):
            invalid_address = Address.objects.create(
                user=self.user,
                street='',  # Empty street should raise validation error
                city='Test City',
                state='TS',
                postal_code='12345'
            )

class GuestUserTests(TestCase):
    def test_guest_user_creation(self):
        guest = GuestUser.objects.create(
            session_key='test_session_key'
        )
        self.assertIsNotNone(guest)
        self.assertEqual(guest.session_key, 'test_session_key')

class APITests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username='testuser',
            phone_number='+1234567890',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)

    def test_user_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_profile_detail(self):
        profile = UserProfile.objects.create(user=self.user)
        response = self.client.get(f'/api/profiles/{profile.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user'], self.user.id)

    def test_address_crud(self):
        # Create
        response = self.client.post('/api/addresses/', {
            'street': '123 Test St',
            'city': 'Test City',
            'state': 'TS',
            'postal_code': '12345'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['street'], '123 Test St')

        # Read
        address_id = response.data['id']
        response = self.client.get(f'/api/addresses/{address_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['city'], 'Test City')

        # Update
        response = self.client.put(
            f'/api/addresses/{address_id}/',
            {
                'street': '456 New St',
                'city': 'New City', 
                'state': 'NS',
                'postal_code': '67890'
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['street'], '456 New St')

        # Delete
        response = self.client.delete(f'/api/addresses/{address_id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Address.objects.filter(id=address_id).exists())
