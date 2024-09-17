from django.db.models.signals import post_save
from django.dispatch import receiver
from products.models import Product
from search.models import SearchIndex

@receiver(post_save, sender=Product)
def create_or_update_search_index(sender, instance, created, **kwargs):
    # Use get_or_create to handle the case where the SearchIndex doesn't exist
    search_index, created = SearchIndex.objects.get_or_create(
        product=instance,
        defaults={
            'title': instance.name,
            'description': instance.description,
            'sku': instance.sku,
            'price': instance.original_price,
            'discounted_price': instance.discounted_price,
            'keywords': f'{instance.name} {instance.description} {instance.tags}',
        }
    )

    if not created:
        # Update the existing search index entry if it was not newly created
        search_index.title = instance.name
        search_index.description = instance.description
        search_index.sku = instance.sku
        search_index.price = instance.original_price
        search_index.discounted_price = instance.discounted_price
        search_index.keywords = f'{instance.name} {instance.description} {instance.tags}'
        search_index.save()
