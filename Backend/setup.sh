#!/bin/bash

# Set project name
PROJECT_NAME="Ecommerce"

# Create a Python virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install Django and other necessary libraries
pip install django djangorestframework pillow django-cors-headers django-environ

# Create Django project
django-admin startproject $PROJECT_NAME .

# Create apps and their respective directories
apps=("accounts" "vendors" "Catalog" "products" "wishlist" "cart" "orders" "payments" "shipping" "search" "analytics" "reviews" "discounts" "notifications" "Chat" "cms")

for app in "${apps[@]}"
do
  python manage.py startapp $app
  mkdir -p $app/templates/$app
done

# Create global template files
touch $PROJECT_NAME/templates/{base.html,navbar.html,footer.html,scripts.html,styles.html,home.html,seo.html,social_share.html}
mkdir -p $PROJECT_NAME/templates/error_pages
touch $PROJECT_NAME/templates/error_pages/{404.html,500.html}

# Create HTML files in each app's template directory
declare -A app_templates

app_templates=(
  ["accounts"]="login.html register.html profile.html password_reset.html password_change.html logout.html account_verification.html email_confirmation.html account_deletion.html"
  ["vendors"]="dashboard.html profile.html settings.html products.html orders.html payments.html reviews.html analytics.html vendor_registration.html vendor_profile_public.html"
  ["Catalog"]="category_list.html category_detail.html subcategory_list.html subcategory_detail.html collections_list.html collection_detail.html collection_edit.html collection_create.html"
  ["products"]="product_list.html product_detail.html product_edit.html product_add.html bulk_upload.html bulk_upload_success.html bulk_upload_error.html product_comparison.html product_reviews_form.html"
  ["wishlist"]="wishlist.html wishlist_empty.html wishlist_share.html"
  ["cart"]="cart.html cart_add.html cart_remove.html cart_update.html cart_empty.html cart_summary.html cart_preview.html"
  ["orders"]="order_history.html order_detail.html order_confirmation.html order_tracking.html order_status.html order_status_detail.html order_status_update.html order_status_history.html order_cancellation.html order_invoice.html"
  ["payments"]="checkout.html payment_success.html payment_failure.html payment_options.html payment_summary.html"
  ["shipping"]="shipping_options.html shipping_tracking.html shipping_address.html shipping_methods.html shipping_summary.html shipping_rate_calculator.html"
  ["search"]="search_results.html search_suggestions.html"
  ["analytics"]="dashboard.html sales_report.html user_activity.html product_performance.html traffic_analysis.html"
  ["reviews"]="product_reviews.html vendor_reviews.html write_review.html review_management.html"
  ["discounts"]="discounts_list.html discount_detail.html apply_discount.html create_discount.html discount_management.html discount_code_input.html"
  ["notifications"]="notifications.html notification_detail.html notification_settings.html"
  ["Chat"]="chat.html chat_history.html chat_settings.html"
  ["cms"]="home.html blog_list.html blog_detail.html faq.html contact.html about.html terms_and_conditions.html privacy_policy.html cms_dashboard.html testimonials.html newsletter_subscription.html"
)

for app in "${!app_templates[@]}"
do
  for template in ${app_templates[$app]}
  do
    touch $app/templates/$app/$template
  done
done

# Populate manage.py with basic Django content
cat > manage.py <<EOL
#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "$PROJECT_NAME.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
EOL

# Populate settings.py with basic configuration
cat > $PROJECT_NAME/settings.py <<EOL
"""
Django settings for $PROJECT_NAME project.

Generated by 'django-admin startproject' using Django 4.0.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'your-secret-key'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'accounts',
    'vendors',
    'Catalog',
    'products',
    'wishlist',
    'cart',
    'orders',
    'payments',
    'shipping',
    'search',
    'analytics',
    'reviews',
    'discounts',
    'notifications',
    'Chat',
    'cms',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = '$PROJECT_NAME.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = '$PROJECT_NAME.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

EOL

# Initialize a Git repository
git init

# Create initial commit
git add .
git commit -m "Initial project setup with Django apps, templates, and required files."

echo "Project setup complete."
