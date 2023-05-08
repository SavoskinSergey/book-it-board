from django.db import models
from core.abstract.models import AbstractModel, AbstractManager


class MailManager(AbstractManager):
    pass


class Mail(AbstractModel):
    subject = models.CharField(max_length=255)
    body = models.TextField()
    sender_name = models.CharField(max_length=255, blank=True, null=True)
    sender_email = models.EmailField(blank=True, null=True)
    sender_phone = models.CharField(max_length=20, blank=True, null=True)
    recipient_name = models.CharField(max_length=255, blank=True, null=True)
    recipient_email = models.EmailField(blank=True, null=True)
    recipient_phone = models.CharField(max_length=20, blank=True, null=True)
    event_status_choises = [
        ('NONE', 'Не связано с событием'),
        ('DRAFT', 'Заявка подана')
    ]
    event_status = models.CharField(
            max_length=8,
            choices=event_status_choises,
            default="NONE"
        )

    status_send = models.BooleanField(default=False)
    send_by_mail = models.BooleanField(default=False)
    send_by_phone = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.sender_name} -> {self.recipient_name}: {self.subject}'
