from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class CustomUser(AbstractUser):
    """
    Custom user model extending the default Django AbstractUser.
    This model uses phone_number as the unique identifier for authentication instead of username.
    """
    email = models.EmailField(unique=False, blank=True, null=True)  # Email is optional
    phone_number = models.CharField(max_length=15, unique=True)  # Phone number is mandatory and unique
    is_vendor = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Ensure this related name does not clash with auth.User
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions_set',  # Ensure this related name does not clash with auth.User
        blank=True,
    )

    USERNAME_FIELD = 'phone_number'  # Use phone number as the username field
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.phone_number

class UserProfile(models.Model):
    """
    UserProfile model to store additional information about the user.
    This model is linked to the CustomUser model with a OneToOne relationship.
    """
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    timezone = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f'{self.user.phone_number} Profile'

class Address(models.Model):
    """
    Address model to store multiple addresses for a user.
    Users can manage their addresses for shipping and billing purposes.
    """
    ADDRESS_TYPE_CHOICES = [
        ('home', 'Home'),
        ('work', 'Work'),
        ('billing', 'Billing'),
        ('shipping', 'Shipping'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='addresses')
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    landmark = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    address_type = models.CharField(max_length=50, choices=ADDRESS_TYPE_CHOICES, default='home')
    is_default = models.BooleanField(default=False)
    address_verified = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.phone_number} - {self.address_line_1}, {self.city}, {self.country}'

    class Meta:
        verbose_name_plural = "Addresses"

class UserActivity(models.Model):
    """
    UserActivity model to track user activities on the platform.
    This can include actions like login, logout, and other important user events.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='account_activities')
    activity = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    device_info = models.CharField(max_length=255, blank=True, null=True)
    user_agent = models.TextField(blank=True, null=True)
    successful = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.user.phone_number} - {self.activity} at {self.timestamp} from {self.ip_address}'
