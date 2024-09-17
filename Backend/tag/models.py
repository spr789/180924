from django.db import models
from django.utils.text import slugify

class Tag(models.Model):
    """
    Tag model represents a keyword or label that can be associated with products, blog posts, etc.
    Tags are used for categorization, filtering, and search optimization.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
