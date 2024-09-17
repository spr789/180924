from django.urls import path
from . import views

app_name = 'cms'

urlpatterns = [
    # Pages
    path('page/<slug:slug>/', views.page_view, name='page_view'),

    # Blog
    path('blog/', views.blog_list, name='blog_list'),
    path('blog/<slug:slug>/', views.blog_detail, name='blog_detail'),

    # Contact
    path('contact/', views.contact_view, name='contact_view'),
    path('contact/thanks/', views.contact_thanks_view, name='contact_thanks'),

    # FAQs
    path('faq/', views.faq_list, name='faq_list'),

    # Testimonials
    path('testimonials/', views.testimonial_list, name='testimonial_list'),

    # Events
    path('events/', views.event_list, name='event_list'),
    path('events/<slug:slug>/', views.event_detail, name='event_detail'),

    # Gallery
    path('gallery/', views.gallery_list, name='gallery_list'),
]
