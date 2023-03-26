from django.db import models

from core.abstract.models import AbstractModel, AbstractManager


class EventManager(AbstractManager):
    pass


class Event(AbstractModel):
    admin = models.ForeignKey(to="core_account.User", on_delete=models.CASCADE)
    body = models.TextField()
    edited = models.BooleanField(default=False)

    objects = EventManager()

    def __str__(self):
        return f"{self.admin.name} {self.body}"