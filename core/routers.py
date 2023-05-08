from rest_framework_nested import routers

from core.event.viewsets import EventViewSet, EventsListSet
from core.account.viewsets import UserViewSet
from core.auth.viewsets import (
    RegisterViewSet,
    LoginViewSet,
    RefreshViewSet,
    LogoutViewSet
)
from core.board.viewsets import BoardViewSet
from core.order.viewsets import OrderViewSet
from core.mail.viewsets import MailViewSet

router = routers.SimpleRouter()

# ##################################################################### #
# ################### AUTH                       ###################### #
# ##################################################################### #

router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
router.register(r'auth/logout', LogoutViewSet, basename='auth-logout')


# ##################################################################### #
# ################### Account                       ###################### #
# ##################################################################### #

router.register(r'account', UserViewSet, basename='account')

# ##################################################################### #
# ################### Event                      ###################### #
# ##################################################################### #

router.register(r'order', OrderViewSet, basename='order')
router.register(r'event', EventViewSet, basename='event')
router.register(r'mail', MailViewSet, basename='mail')

router.register(r'events-stat', EventsListSet, basename='events-stat')

events_router = routers.NestedSimpleRouter(router, r'event', lookup='event')
events_router.register(r'board', BoardViewSet, basename='event-board')


urlpatterns = [
    *router.urls,
    *events_router.urls
]
