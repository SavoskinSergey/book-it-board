from django.conf import settings
from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.dispatch import receiver

from core.account.models import User
from .models import Event


@receiver(post_save, sender=Event)
def mail(sender, instance, created, **kwargs):
    if created:
        recipient = User.objects.get_object_by_public_id(
                instance.admin.public_id
                )

        send_mail(
            subject='Create Event',
            message=f'Пользователь {recipient.username} добавил событие '
                    f'{instance.body} на дату '
                    f'{instance.event_data}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient.email],
        )
