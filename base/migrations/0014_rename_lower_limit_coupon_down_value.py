# Generated by Django 3.2.6 on 2022-07-07 05:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_coupon_lower_limit'),
    ]

    operations = [
        migrations.RenameField(
            model_name='coupon',
            old_name='lower_limit',
            new_name='down_value',
        ),
    ]
