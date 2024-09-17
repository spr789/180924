# Generated by Django 5.1 on 2024-09-06 10:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0003_alter_productimage_image"),
        ("search", "0002_alter_searchquery_user"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="autocompletesuggestion",
            options={"ordering": ["-relevance_score", "-created_at"]},
        ),
        migrations.AlterModelOptions(
            name="filteroption",
            options={"ordering": ["name"]},
        ),
        migrations.AlterModelOptions(
            name="popularsearchterm",
            options={"ordering": ["-search_count"]},
        ),
        migrations.AlterModelOptions(
            name="searchindex",
            options={"ordering": ["-updated_at"]},
        ),
        migrations.AlterField(
            model_name="searchquery",
            name="is_successful",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="searchquery",
            name="user",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="search_queries",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterUniqueTogether(
            name="filteroption",
            unique_together={("name", "type", "value")},
        ),
        migrations.AddIndex(
            model_name="autocompletesuggestion",
            index=models.Index(
                fields=["suggestion"], name="search_auto_suggest_a67f1c_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="searchindex",
            index=models.Index(fields=["title"], name="search_sear_title_51a3a1_idx"),
        ),
        migrations.AddIndex(
            model_name="searchindex",
            index=models.Index(
                fields=["keywords"], name="search_sear_keyword_974af2_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="searchindex",
            index=models.Index(fields=["sku"], name="search_sear_sku_c2728c_idx"),
        ),
    ]
