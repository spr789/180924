from django.db import models
from accounts.models import CustomUser
from products.models import Product

class wishlist(models.Model):
    """
    wishlist model represents a collection of products a user wishes to save for later purchase.
    """
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='wishlists')
    name = models.CharField(max_length=255, default='My wishlist')  # Custom name for the wishlist
    description = models.TextField(blank=True, null=True)  # Optional description of the wishlist
    is_public = models.BooleanField(default=False)  # Whether the wishlist is public or private
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_accessed = models.DateTimeField(auto_now=True)  # Last time the wishlist was accessed
    item_count = models.PositiveIntegerField(default=0)  # Total number of items in the wishlist

    def __str__(self):
        return f'{self.name} - {self.user.email}'

    def update_item_count(self):
        self.item_count = self.items.count()
        self.save()

class wishlistItem(models.Model):
    """
    wishlistItem model stores individual products within a wishlist.
    """
    wishlist = models.ForeignKey(wishlist, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    priority = models.PositiveIntegerField(default=1)  # Priority level, with 1 being the highest
    notes = models.TextField(blank=True, null=True)  # Optional notes for the item
    quantity_desired = models.PositiveIntegerField(default=1)  # How many units the user wants
    is_available = models.BooleanField(default=True)  # Tracks if the product is currently in stock
    price_at_addition = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Price at the time of addition to the wishlist
    last_checked_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Last known price of the product

    def __str__(self):
        return f'{self.product.name} in {self.wishlist.name} - {self.wishlist.user.email}'

    def save(self, *args, **kwargs):
        # Automatically update the wishlist item count when items are added or removed
        super().save(*args, **kwargs)
        self.wishlist.update_item_count()

    def delete(self, *args, **kwargs):
        # Update the item count when an item is removed
        super().delete(*args, **kwargs)
        self.wishlist.update_item_count()
