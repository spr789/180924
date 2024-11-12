from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, UserProfile

@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, created, **kwargs):
    """
    Create or update a UserProfile instance when a CustomUser is created or updated
    """
    if created:
        UserProfile.objects.create(user=instance)
    else:
        # Get or create the profile if it doesn't exist
        UserProfile.objects.get_or_create(user=instance)
