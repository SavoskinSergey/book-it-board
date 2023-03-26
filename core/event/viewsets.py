from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from core.abstract.viewsets import AbstractViewSet
from core.event.models import Event
from core.event.serializers import EventSerializer
from core.auth.permissions import UserPermission


class EventViewSet(AbstractViewSet):
    http_method_names = ('post', 'get', 'put', 'delete')
    permission_classes = (UserPermission,)
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.all()

    def get_object(self):
        obj = Event.objects.get_object_by_public_id(self.kwargs['pk'])

        self.check_object_permissions(self.request, obj)

        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=True)
    def subscribe(self, request, *args, **kwargs):
        event = self.get_object()
        user = self.request.user

        user.subscribe(event)

        serializer = self.serializer_class(event)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def remove_subscribe(self, request, *args, **kwargs):
        event = self.get_object()
        user = self.request.user

        user.remove_subscribe(event)

        serializer = self.serializer_class(event)

        return Response(serializer.data, status=status.HTTP_200_OK)
