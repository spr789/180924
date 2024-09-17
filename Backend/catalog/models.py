from django.db import models
from django.utils.text import slugify
from django.db.models.signals import pre_save
from django.dispatch import receiver

class Category(models.Model):
    """
    Category model represents the main categories of products and supports subcategories.
    Includes SEO fields, an image field, and sorting options.
    """
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True, null=True)
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        related_name='subcategories', 
        blank=True, 
        null=True
    )
    image = models.ImageField(upload_to='category_images/', blank=True, null=True)
    meta_title = models.CharField(max_length=255, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    meta_keywords = models.CharField(max_length=255, blank=True, null=True)
    sort_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['sort_order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def is_root_category(self):
        """
        Returns True if the category is a root category (i.e., has no parent).
        """
        return self.parent is None

    def get_subcategories(self):
        """
        Returns all subcategories of this category.
        """
        return self.subcategories.filter(is_active=True)

    def get_absolute_url(self):
        """
        Returns the URL of the category using its slug.
        """
        return f'/catalog/{self.slug}/'


# Signal to automatically set slug if it's not provided
@receiver(pre_save, sender=Category)
def auto_generate_slug(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.name)


class Collection(models.Model):
    """
    Collection model represents a group of products that are related in some way.
    Includes SEO fields, an image field, and sorting options.
    """
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name='collections')
    image = models.ImageField(upload_to='collection_images/', blank=True, null=True)
    meta_title = models.CharField(max_length=255, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    meta_keywords = models.CharField(max_length=255, blank=True, null=True)
    sort_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['sort_order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
