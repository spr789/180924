from django.contrib import admin
from .models import Page, BlogPost, BlogCategory, Tag, MenuItem, ContactFormSubmission, Banner, FAQ, Testimonial, Gallery, Event

# Admin for Page
class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_published', 'created_at', 'updated_at')
    search_fields = ('title', 'content')
    list_filter = ('is_published',)
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at')

# Admin for BlogPost
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'is_published', 'created_at', 'updated_at')
    search_fields = ('title', 'content', 'author__email')
    list_filter = ('is_published', 'categories', 'tags')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at', 'published_at')

# Admin for BlogCategory
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at')

# Admin for Tag
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at')

# Admin for MenuItem
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'url', 'parent', 'order', 'is_active')
    search_fields = ('title', 'url')
    list_filter = ('is_active',)
    readonly_fields = ('created_at', 'updated_at')

# Admin for ContactFormSubmission
class ContactFormSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'submitted_at')
    search_fields = ('name', 'email', 'subject')
    readonly_fields = ('submitted_at',)

# Admin for Banner
class BannerAdmin(admin.ModelAdmin):
    list_display = ('title', 'position', 'is_active', 'created_at', 'updated_at')
    search_fields = ('title', 'position')
    list_filter = ('is_active', 'position')
    readonly_fields = ('created_at', 'updated_at')

# Admin for FAQ
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'order', 'is_active')
    search_fields = ('question', 'answer')
    list_filter = ('is_active',)
    readonly_fields = ('created_at', 'updated_at')

# Admin for Testimonial
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'is_active', 'created_at', 'updated_at')
    search_fields = ('customer_name', 'testimonial')
    list_filter = ('is_active',)
    readonly_fields = ('created_at', 'updated_at')

# Admin for Gallery
class GalleryAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_filter = ('is_active',)
    readonly_fields = ('created_at', 'updated_at')

# Admin for Event
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date', 'is_published', 'created_at', 'updated_at')
    search_fields = ('title', 'description', 'location')
    list_filter = ('is_published', 'start_date', 'end_date')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(Page, PageAdmin)
admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(BlogCategory, BlogCategoryAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(MenuItem, MenuItemAdmin)
admin.site.register(ContactFormSubmission, ContactFormSubmissionAdmin)
admin.site.register(Banner, BannerAdmin)
admin.site.register(FAQ, FAQAdmin)
admin.site.register(Testimonial, TestimonialAdmin)
admin.site.register(Gallery, GalleryAdmin)
admin.site.register(Event, EventAdmin)
