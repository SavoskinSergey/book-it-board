import secrets
from django.db import models
from core.abstract.models import AbstractModel, AbstractManager

from . import OrderStatus


class OrderdManager(AbstractManager):
    pass


class Order(AbstractModel):
    event = models.ForeignKey(
        'core_event.Event',
        blank=True,
        null=True,
        related_name='orders',
        on_delete=models.SET_NULL)

    status = models.CharField(
        max_length=32, default=OrderStatus.DRAFT, choices=OrderStatus.CHOICES
    )
    account = models.ForeignKey(
        'core_account.User',
        blank=True,
        null=True,
        related_name='orders',
        on_delete=models.SET_NULL
        )
    token = models.CharField(max_length=36, unique=True, blank=True)
    comment = models.TextField()
    edited = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        """
            Сохраняет объект в базу данных и генерирует токен, если он
            не задан.
            Сначала генерим 8символов, после активации заказа, или если
            дата события прошла обновляем токенна uuid4
            (идея в том чтобы хранить более читаемые ИД)
        """
        if not self.token:
            self.token = secrets.token_hex(4)
        return super().save(*args, **kwargs)
