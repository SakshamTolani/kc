# Generated by Django 3.2.6 on 2022-09-08 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0016_auto_20220909_0018'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coupon',
            name='used_by',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='coupon',
            name='users',
            field=models.IntegerField(default=0),
        ),
    ]
