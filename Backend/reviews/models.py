from django.db import models
from products.models import Product
from orders.models import Order
from django.conf import settings

class Review(models.Model):
    """
    Review model stores reviews submitted by customers for products.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='customer_reviews')
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviews')
    rating = models.PositiveIntegerField(default=0)  # Rating out of 5 or 10
    title = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='review_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)  # Admin approval status

    def __str__(self):
        return f'Review by {self.user.email} on {self.product.name}'

    class Meta:
        unique_together = ('user', 'product', 'order')

class ReviewComment(models.Model):
    """
    ReviewComment model stores comments on reviews.
    """
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='review_comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Comment by {self.user.email} on Review {self.review.id}'

class ReviewVote(models.Model):
    """
    ReviewVote model stores upvotes and downvotes for reviews.
    """
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='votes')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='review_votes')
    is_upvote = models.BooleanField(default=True)  # True for upvote, False for downvote
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Vote by {self.user.email} on Review {self.review.id} - {"Upvote" if self.is_upvote else "Downvote"}'

    class Meta:
        unique_together = ('review', 'user')
