from django.contrib import admin
from .models import Category, Collection

# Admin for Category
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'sort_order', 'is_active')
    search_fields = ('name', 'description', 'meta_title')
    list_filter = ('is_active', 'parent')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['sort_order', 'name']

# Admin for Collection
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'sort_order', 'is_active')
    search_fields = ('name', 'description', 'meta_title')
    list_filter = ('is_active',)
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['sort_order', 'name']

admin.site.register(Category, CategoryAdmin)
admin.site.register(Collection, CollectionAdmin)
