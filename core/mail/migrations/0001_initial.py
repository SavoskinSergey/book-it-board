# Generated by Django 4.1.7 on 2023-05-08 08:46

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Mail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('public_id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, unique=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('subject', models.CharField(max_length=255)),
                ('body', models.TextField()),
                ('sender_name', models.CharField(blank=True, max_length=255, null=True)),
                ('sender_email', models.EmailField(blank=True, max_length=254, null=True)),
                ('sender_phone', models.CharField(blank=True, max_length=20, null=True)),
                ('recipient_name', models.CharField(blank=True, max_length=255, null=True)),
                ('recipient_email', models.EmailField(blank=True, max_length=254, null=True)),
                ('recipient_phone', models.CharField(blank=True, max_length=20, null=True)),
                ('event_status', models.CharField(choices=[('NONE', 'Не связано с событием'), ('DRAFT', 'Заявка подана')], default='NONE', max_length=8)),
                ('status_send', models.BooleanField(default=False)),
                ('send_by_mail', models.BooleanField(default=False)),
                ('send_by_phone', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
