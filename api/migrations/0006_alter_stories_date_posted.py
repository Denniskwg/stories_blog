# Generated by Django 3.2.6 on 2023-11-06 10:35

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_user_managers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stories',
            name='date_posted',
            field=models.DateTimeField(default=api.models.get_time),
        ),
    ]
