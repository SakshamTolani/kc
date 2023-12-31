# Generated by Django 3.2.6 on 2022-10-06 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0017_auto_20220909_0142'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contactus',
            old_name='fname',
            new_name='compName',
        ),
        migrations.RemoveField(
            model_name='contactus',
            name='category',
        ),
        migrations.RemoveField(
            model_name='contactus',
            name='lname',
        ),
        migrations.RemoveField(
            model_name='contactus',
            name='orderNumber',
        ),
        migrations.AlterField(
            model_name='coupon',
            name='used_by',
            field=models.IntegerField(default=0, editable=False),
        ),
    ]
