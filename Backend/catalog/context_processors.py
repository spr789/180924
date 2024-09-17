from .models import Category

def catalog_categories(request):
    """
    Context processor to make catalog categories available in all templates.
    """
    return {
        'categories': Category.objects.all()
    }
