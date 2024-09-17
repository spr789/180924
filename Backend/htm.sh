#!/bin/bash

# Define the content for each urls.py
declare -A urls_content

urls_content[accounts]="from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('profile/', views.profile_view, name='profile'),
    path('password-change/', views.password_change_view, name='password_change'),
    path('password-reset/', views.password_reset_view, name='password_reset'),
]
"

urls_content[products]="from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('', views.product_list_view, name='product_list'),
    path('<slug:slug>/', views.product_detail_view, name='product_detail'),
    path('add/', views.product_create_view, name='product_add'),
    path('<slug:slug>/edit/', views.product_edit_view, name='product_edit'),
]
"

urls_content[orders]="from django.urls import path
from . import views

app_name = 'orders'

urlpatterns = [
    path('', views.order_list_view, name='order_list'),
    path('<int:order_id>/', views.order_detail_view, name='order_detail'),
    path('<int:order_id>/invoice/', views.order_invoice_view, name='order_invoice'),
    path('<int:order_id>/tracking/', views.order_tracking_view, name='order_tracking'),
]
"

urls_content[shipping]="from django.urls import path
from . import views

app_name = 'shipping'

urlpatterns = [
    path('methods/', views.shipping_method_view, name='shipping_method'),
    path('summary/', views.shipping_summary_view, name='shipping_summary'),
    path('shipment/<int:shipment_id>/', views.shipment_detail_view, name='shipment_detail'),
]
"

urls_content[cart]="from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('', views.cart_view, name='cart_view'),
    path('checkout/', views.checkout_view, name='checkout'),
    path('summary/', views.cart_summary_view, name='cart_summary'),
]
"

urls_content[payments]="from django.urls import path
from . import views

app_name = 'payments'

urlpatterns = [
    path('methods/', views.payment_method_view, name='payment_method'),
    path('history/', views.payment_history_view, name='payment_history'),
    path('confirmation/', views.payment_confirmation_view, name='payment_confirmation'),
]
"

urls_content[reviews]="from django.urls import path
from . import views

app_name = 'reviews'

urlpatterns = [
    path('', views.review_list_view, name='review_list'),
    path('<int:review_id>/', views.review_detail_view, name='review_detail'),
    path('create/', views.review_create_view, name='review_create'),
]
"

urls_content[notifications]="from django.urls import path
from . import views

app_name = 'notifications'

urlpatterns = [
    path('', views.notification_list_view, name='notification_list'),
    path('<int:notification_id>/', views.notification_detail_view, name='notification_detail'),
    path('settings/', views.notification_settings_view, name='notification_settings'),
]
"

urls_content[cms]="from django.urls import path
from . import views

app_name = 'cms'

urlpatterns = [
    path('', views.home_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),
    path('faq/', views.faq_view, name='faq'),
    path('terms/', views.terms_and_conditions_view, name='terms_and_conditions'),
    path('privacy/', views.privacy_policy_view, name='privacy_policy'),
    path('blog/', views.blog_list_view, name='blog_list'),
    path('blog/<slug:slug>/', views.blog_detail_view, name='blog_detail'),
]
"

urls_content[analytics]="from django.urls import path
from . import views

app_name = 'analytics'

urlpatterns = [
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('traffic/', views.traffic_analysis_view, name='traffic_analysis'),
    path('sales/', views.sales_report_view, name='sales_report'),
    path('user-activity/', views.user_activity_view, name='user_activity'),
]
"

urls_content[search]="from django.urls import path
from . import views

app_name = 'search'

urlpatterns = [
    path('results/', views.search_results_view, name='search_results'),
    path('advanced/', views.advanced_search_view, name='advanced_search'),
]
"

urls_content[support]="from django.urls import path
from . import views

app_name = 'support'

urlpatterns = [
    path('contact/', views.support_contact_view, name='support_contact'),
    path('faq/', views.support_faq_view, name='support_faq'),
    path('ticket/', views.support_ticket_view, name='support_ticket'),
]
"

urls_content[vendors]="from django.urls import path
from . import views

app_name = 'vendors'

urlpatterns = [
    path('dashboard/', views.vendor_dashboard_view, name='vendor_dashboard'),
    path('profile/', views.vendor_profile_view, name='vendor_profile'),
    path('orders/', views.vendor_orders_view, name='vendor_orders'),
    path('shipments/', views.vendor_shipments_view, name='vendor_shipments'),
    path('products/', views.vendor_products_view, name='vendor_products'),
    path('reviews/', views.vendor_reviews_view, name='vendor_reviews'),
    path('settings/', views.vendor_settings_view, name='vendor_settings'),
    path('register/', views.vendor_registration_view, name='vendor_registration'),
]
"

urls_content[affiliate]="from django.urls import path
from . import views

app_name = 'affiliate'

urlpatterns = [
    path('dashboard/', views.affiliate_dashboard_view, name='affiliate_dashboard'),
    path('earnings/', views.affiliate_earnings_view, name='affiliate_earnings'),
    path('program/', views.affiliate_program_view, name='affiliate_program'),
]
"

urls_content[loyalty]="from django.urls import path
from . import views

app_name = 'loyalty'

urlpatterns = [
    path('program/', views.loyalty_program_view, name='loyalty_program'),
    path('points/', views.loyalty_points_view, name='loyalty_points'),
    path('rewards/', views.loyalty_rewards_view, name='loyalty_rewards'),
]
"

urls_content[discounts]="from django.urls import path
from . import views

app_name = 'discounts'

urlpatterns = [
    path('', views.discount_list_view, name='discount_list'),
    path('<int:discount_id>/', views.discount_detail_view, name='discount_detail'),
    path('create/', views.discount_create_view, name='discount_create'),
    path('apply/', views.apply_discount_view, name='apply_discount'),
]
"

urls_content[marketing]="from django.urls import path
from . import views

app_name = 'marketing'

urlpatterns = [
    path('dashboard/', views.campaign_dashboard_view, name='campaign_dashboard'),
    path('create/', views.campaign_create_view, name='campaign_create'),
    path('<int:campaign_id>/edit/', views.campaign_edit_view, name='campaign_edit'),
    path('<int:campaign_id>/', views.campaign_detail_view, name='campaign_detail'),
]
"

urls_content[wishlist]="from django.urls import path
from . import views

app_name = 'wishlist'

urlpatterns = [
    path('', views.wishlist_view, name='wishlist_view'),
    path('<int:item_id>/', views.wishlist_item_view, name='wishlist_item'),
    path('empty/', views.wishlist_empty_view, name='wishlist_empty'),
]
"

urls_content[catalog]="from django.urls import path
from . import views

app_name = 'catalog'

urlpatterns = [
    path('categories/', views.category_list_view, name='category_list'),
    path('categories/<slug:slug>/', views.category_detail_view, name='category_detail'),
    path('collections/', views.collection_list_view, name='collection_list'),
    path('collections/<slug:slug>/', views.collection_detail_view, name='collection_detail'),
]
"



# Create the urls.py file in each existing app directory
for app in "${!urls_content[@]}"; do
    if [ -d "$app" ]; then  # Check if the app directory exists
        echo "${urls_content[$app]}" > "$app/urls.py"
        echo "Created $app/urls.py"
    else
        echo "Directory $app does not exist. Skipping..."
    fi
done
