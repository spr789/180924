from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator

class CustomUser(AbstractUser):
    """
    Custom user model extending the default Django AbstractUser.
    This model uses phone_number as the unique identifier for authentication instead of username.
    """
    email = models.EmailField(unique=False, blank=True, null=True)  # Email is optional
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,12}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=15, unique=True)
    is_vendor = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Custom related name to avoid conflicts
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions_set',  # Custom related name to avoid conflicts
        blank=True,
    )

    USERNAME_FIELD = 'phone_number'  # Use phone number as the username field
    REQUIRED_FIELDS = ['username']  # Username is still required as part of AbstractUser

    def __str__(self):
        return self.phone_number

class GuestUser(models.Model):
    """
    GuestUser model for tracking non-registered users who interact with the platform.
    This model is used to associate temporary sessions and activities with unregistered users.
    """
    session_key = models.CharField(max_length=40, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Guest-{self.session_key[:8]}"

    class Meta:
        verbose_name = 'Guest User'
        verbose_name_plural = 'Guest Users'
        ordering = ['-last_activity']

class UserProfile(models.Model):
    """
    UserProfile model to store additional information about the user.
    Linked to the CustomUser model with a OneToOne relationship.
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
    Address model to store multiple addresses for both users and guest users.
    Supports multiple address types and tracks default status.
    """
    ADDRESS_TYPE_CHOICES = [
        ('home', 'Home'),
        ('work', 'Work'),
        ('billing', 'Billing'),
        ('shipping', 'Shipping'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='addresses', null=True, blank=True)
    guest_user = models.ForeignKey(GuestUser, on_delete=models.CASCADE, related_name='addresses', null=True, blank=True)
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
        return f'{self.user.phone_number if self.user else "Guest-" + self.guest_user.session_key[:8]} - {self.address_line_1}, {self.city}, {self.country}'

    class Meta:
        verbose_name_plural = "Addresses"
        ordering = ['-is_default', 'address_type']
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'is_default', 'address_type'],
                name='unique_default_address_type_user',
                condition=models.Q(user__isnull=False)
            ),
            models.UniqueConstraint(
                fields=['guest_user', 'is_default', 'address_type'],
                name='unique_default_address_type_guest',
                condition=models.Q(guest_user__isnull=False)
            ),
            models.CheckConstraint(
                check=(models.Q(user__isnull=False, guest_user__isnull=True) |
                       models.Q(user__isnull=True, guest_user__isnull=False)),
                name='user_or_guest_user_not_both'
            )
        ]

    def save(self, *args, **kwargs):
        # Ensure only one default address per user or guest user per address type
        if self.is_default:
            if self.user:
                Address.objects.filter(
                    user=self.user,
                    address_type=self.address_type,
                    is_default=True
                ).exclude(pk=self.pk).update(is_default=False)
            elif self.guest_user:
                Address.objects.filter(
                    guest_user=self.guest_user,
                    address_type=self.address_type,
                    is_default=True
                ).exclude(pk=self.pk).update(is_default=False)
        
        super().save(*args, **kwargs)

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
        return f'{self.user.phone_number if self.user else "Guest"} - {self.activity} at {self.timestamp} from {self.ip_address}'

    class Meta:
        verbose_name_plural = "User Activities"
        ordering = ['-timestamp']
