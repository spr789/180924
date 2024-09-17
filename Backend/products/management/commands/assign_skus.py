from django.core.management.base import BaseCommand
from django.utils.text import slugify
from products.models import Product

class Command(BaseCommand):
    help = 'Assigns SKUs to products with missing SKU values'

    def handle(self, *args, **kwargs):
        products_with_empty_sku = Product.objects.filter(sku__isnull=True) | Product.objects.filter(sku='')

        for product in products_with_empty_sku:
            # Generate an SKU using the product name and ID
            product.sku = f"{slugify(product.name)}-{product.id}"
            product.save()

        self.stdout.write(self.style.SUCCESS('Generated and assigned unique SKUs for products with missing SKU.'))
