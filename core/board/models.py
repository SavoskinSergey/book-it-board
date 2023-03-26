from django.db import models

from core.abstract.models import AbstractModel, AbstractManager


class BoardManager(AbstractManager):
    pass


class Board(AbstractModel):
    event = models.ForeignKey("core_event.Event", on_delete=models.CASCADE)
    operator = models.ForeignKey("core_account.User", on_delete=models.CASCADE)

    comment = models.TextField()
    edited = models.BooleanField(default=False)

    objects = BoardManager()

    def __str__(self):
        return self.operator.name