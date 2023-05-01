import pytest

from core.fixtures.user import user # noqa
from core.event.models import Event


@pytest.fixture
def event(db, user): # noqa
    return Event.objects.create(admin=user, body='Test Description Event')
