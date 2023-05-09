from django.apps import AppConfig


class EventConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.event'
    label = 'core_event'

    def ready(self):
        import core.event.signals
