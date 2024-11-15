# Generated by Django 5.1.1 on 2024-11-12 18:19

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GuestUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_key', models.CharField(max_length=40, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_activity', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Guest User',
                'verbose_name_plural': 'Guest Users',
                'ordering': ['-last_activity'],
            },
        ),
        migrations.AlterModelOptions(
            name='address',
            options={'ordering': ['-is_default', 'address_type'], 'verbose_name_plural': 'Addresses'},
        ),
        migrations.AlterModelOptions(
            name='useractivity',
            options={'ordering': ['-timestamp'], 'verbose_name_plural': 'User Activities'},
        ),
        migrations.AlterField(
            model_name='address',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='phone_number',
            field=models.CharField(max_length=15, unique=True, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", regex='^\\+?1?\\d{9,12}$')]),
        ),
        migrations.AddField(
            model_name='address',
            name='guest_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to='accounts.guestuser'),
        ),
        migrations.AddConstraint(
            model_name='address',
            constraint=models.UniqueConstraint(condition=models.Q(('user__isnull', False)), fields=('user', 'is_default', 'address_type'), name='unique_default_address_type_user'),
        ),
        migrations.AddConstraint(
            model_name='address',
            constraint=models.UniqueConstraint(condition=models.Q(('guest_user__isnull', False)), fields=('guest_user', 'is_default', 'address_type'), name='unique_default_address_type_guest'),
        ),
        migrations.AddConstraint(
            model_name='address',
            constraint=models.CheckConstraint(condition=models.Q(models.Q(('guest_user__isnull', True), ('user__isnull', False)), models.Q(('guest_user__isnull', False), ('user__isnull', True)), _connector='OR'), name='user_or_guest_user_not_both'),
        ),
    ]
