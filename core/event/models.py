from django.db import models
from django.utils import timezone
from core.abstract.models import AbstractModel, AbstractManager


def event_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/event/<filename>
    return f'event/{filename}_{instance}'


class EventManager(AbstractManager):
    pass


class Event(AbstractModel):
    admin = models.ForeignKey(to='core_account.User', on_delete=models.CASCADE)
    body = models.TextField()
    edited = models.BooleanField(default=False)
    image = models.ImageField(
        null=True, blank=True, upload_to=event_directory_path
        )
    event_data = models.DateTimeField(
        default=timezone.now
        )
    event_limit = models.PositiveSmallIntegerField(default=3)
    duration = models.DurationField(null=True, blank=True)

    objects = EventManager()

    def __str__(self):
        return f'{self.admin.name} {self.event_data}'
