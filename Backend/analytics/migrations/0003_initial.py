# Generated by Django 5.1 on 2024-08-28 07:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("analytics", "0002_initial"),
        ("products", "0001_initial"),
        ("vendors", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="salesdata",
            name="vendor",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="sales_data",
                to="vendors.vendorprofile",
            ),
        ),
        migrations.AddField(
            model_name="useractivity",
            name="product",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="activity_product",
                to="products.product",
            ),
        ),
        migrations.AddField(
            model_name="useractivity",
            name="user",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="analytics_activities",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="vendorperformance",
            name="vendor",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="performance_data",
                to="vendors.vendorprofile",
            ),
        ),
    ]
