# Generated by Django 4.1.7 on 2023-05-04 06:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core_event', '0005_event_duration_alter_event_event_limit'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('public_id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, unique=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(choices=[('draft', 'Заявка на участие принята'), ('aprove', 'Участие подтверждено администратором'), ('paid', 'Участие оплачено'), ('canceled', 'Заявка отменена')], default='draft', max_length=32)),
                ('token', models.CharField(blank=True, max_length=36, unique=True)),
                ('comment', models.TextField()),
                ('account', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders', to=settings.AUTH_USER_MODEL)),
                ('event', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders', to='core_event.event')),
            ],
            options={
                'ordering': ['-updated'],
                'abstract': False,
            },
        ),
    ]
