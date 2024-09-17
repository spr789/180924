from django.db import models
from accounts.models import CustomUser
from vendors.models import VendorProfile

class Notification(models.Model):
    """
    Notification model represents a generic notification that can be sent to any user.
    """
    recipient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    notification_type = models.CharField(max_length=50, choices=[
        ('general', 'General'),
        ('order', 'Order'),
        ('shipping', 'Shipping'),
        ('promotion', 'Promotion'),
    ], default='general')

    def __str__(self):
        return f'Notification to {self.recipient.email} - {self.title}'

class VendorNotification(models.Model):
    """
    VendorNotification model represents notifications that are specific to vendors.
    """
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name='vendor_notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    notification_type = models.CharField(max_length=50, choices=[
        ('order', 'Order'),
        ('payment', 'Payment'),
        ('shipment', 'Shipment'),
        ('general', 'General'),
    ], default='general')

    def __str__(self):
        return f'Notification for {self.vendor.business_name} - {self.title}'

class NotificationPreference(models.Model):
    """
    NotificationPreference model allows users to customize their notification preferences.
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='notification_preferences')
    receive_email_notifications = models.BooleanField(default=True)
    receive_sms_notifications = models.BooleanField(default=False)
    receive_push_notifications = models.BooleanField(default=True)
    receive_vendor_notifications = models.BooleanField(default=True)

    def __str__(self):
        return f'Notification Preferences for {self.user.email}'

class NotificationLog(models.Model):
    """
    NotificationLog model stores a log of all notifications sent to a user or vendor.
    """
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE, related_name='logs', null=True, blank=True)
    vendor_notification = models.ForeignKey(VendorNotification, on_delete=models.CASCADE, related_name='logs', null=True, blank=True)
    sent_at = models.DateTimeField(auto_now_add=True)
    delivery_method = models.CharField(max_length=50, choices=[
        ('email', 'Email'),
        ('sms', 'SMS'),
        ('push', 'Push Notification'),
    ])

    def __str__(self):
        if self.notification:
            return f'Log for Notification to {self.notification.recipient.email} via {self.delivery_method}'
        elif self.vendor_notification:
            return f'Log for Vendor Notification to {self.vendor_notification.vendor.business_name} via {self.delivery_method}'
        return 'Notification Log'
