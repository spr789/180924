from django.db import models
from accounts.models import CustomUser, Address
from products.models import Product
from datetime import datetime, timedelta

class cart(models.Model):
    """
    cart model stores items that a user intends to purchase.
    Includes fields for handling abandoned carts.
    """
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='carts', null=True, blank=True)
    session_id = models.CharField(max_length=255, blank=True, null=True)  # For guest users
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_activity = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_abandoned = models.BooleanField(default=False)
    abandoned_at = models.DateTimeField(blank=True, null=True)
    reminder_sent = models.BooleanField(default=False)
    reminder_sent_at = models.DateTimeField(blank=True, null=True)
    recovered = models.BooleanField(default=False)

    def __str__(self):
        return f'cart of {self.user.email if self.user else "Guest"}'

    def get_total_price(self):
        return sum(item.get_total_price() for item in self.items.all())

    def mark_as_abandoned(self):
        """
        Marks the cart as abandoned if it hasn't been updated for a certain period.
        """
        abandonment_threshold = datetime.now() - timedelta(days=1)  # Example: 1 day of inactivity
        if self.last_activity < abandonment_threshold and not self.is_abandoned:
            self.is_abandoned = True
            self.abandoned_at = datetime.now()
            self.save()

            # Save details to Abandonedcart
            self.save_abandoned_cart()

    def save_abandoned_cart(self):
        """
        Saves the cart details into the Abandonedcart model when the cart is marked as abandoned.
        """
        abandoned_cart = Abandonedcart.objects.create(
            user=self.user,
            session_id=self.session_id,
            shipping_address=self.user.addresses.filter(address_type='shipping').first() if self.user else None,
            billing_address=self.user.addresses.filter(address_type='billing').first() if self.user else None,
            abandoned_at=datetime.now(),
            total_amount=self.get_total_price(),
        )

        for item in self.items.all():
            AbandonedcartItem.objects.create(
                abandoned_cart=abandoned_cart,
                product=item.product,
                quantity=item.quantity,
                price=item.product.discounted_price if item.product.discounted_price else item.product.original_price,
                total_price=item.get_total_price(),
            )

        return abandoned_cart

    def recover_cart(self):
        """
        Recovers the cart if the user returns and completes the purchase.
        """
        if self.is_abandoned:
            self.recovered = True
            self.is_abandoned = False
            self.save()

class cartItem(models.Model):
    """
    cartItem model stores individual products in a cart.
    """
    cart = models.ForeignKey(cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.product.name} in cart of {self.cart.user.email if self.cart.user else "Guest"}'

    def get_total_price(self):
        return self.product.discounted_price * self.quantity if self.product.discounted_price else self.product.original_price * self.quantity

class Abandonedcart(models.Model):
    """
    Abandonedcart model stores details of a cart that was abandoned.
    """
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    session_id = models.CharField(max_length=255, blank=True, null=True)  # For guest users
    shipping_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True, related_name='abandoned_carts')
    billing_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True, related_name='abandoned_billing_carts')
    created_at = models.DateTimeField(auto_now_add=True)
    abandoned_at = models.DateTimeField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_recovered = models.BooleanField(default=False)
    recovered_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'Abandoned cart of {self.user.email if self.user else "Guest"} at {self.abandoned_at}'

class AbandonedcartItem(models.Model):
    """
    AbandonedcartItem model stores individual products in an abandoned cart.
    """
    abandoned_cart = models.ForeignKey(Abandonedcart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f'{self.product.name if self.product else "Unknown Product"} in abandoned cart'

