import pytest

from core.fixtures.user import user # noqa
from core.event.models import Event


@pytest.mark.django_db
def test_create_event(user): # noqa
    event = Event.objects.create(admin=user, body="Test Post Body")
    assert event.body == "Test Post Body"
    assert event.admin == user
