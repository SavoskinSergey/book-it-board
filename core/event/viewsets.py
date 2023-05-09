from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.core.cache import cache
from django.core.mail import send_mail
from django.utils.datastructures import MultiValueDictKeyError

from core.abstract.viewsets import AbstractViewSet
from core.account.models import User
from core.event.models import Event
from core.event.serializers import EventSerializer, EventsListSerializer
from core.auth.permissions import UserPermission


class EventViewSet(AbstractViewSet):
    http_method_names = ('post', 'get', 'put', 'patch', 'delete')
    permission_classes = (UserPermission,)
    serializer_class = EventSerializer
    filterset_fields = ['admin__public_id']

    def get_queryset(self):
        return Event.objects.all()

    def get_object(self):
        obj = Event.objects.get_object_by_public_id(self.kwargs['pk'])

        self.check_object_permissions(self.request, obj)

        return obj

    def list(self, request, *args, **kwargs):
        try:
            admin_id = request.GET['admin__public_id']
            event_objects = cache.get(''.join(['event_objects_', admin_id]))
            if event_objects is None:
                event_objects = self.filter_queryset(self.get_queryset())
                cache.set(''.join(['event_objects_', admin_id]), event_objects)
        except MultiValueDictKeyError:
            event_objects = cache.get('event_objects')
            if event_objects is None:
                event_objects = self.get_queryset()
                cache.set('event_objects', event_objects)
        # if event_objects is None:
        #     event_objects = self.filter_queryset(self.get_queryset())
        #     cache.set('event_objects', event_objects)

        page = self.paginate_queryset(event_objects)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(event_objects, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        cache.delete(''.join(['event_objects_', request.data['admin']]))
        recipient = User.objects.get_object_by_public_id(
                request.data['admin']
                )
        send_mail(
            subject='Create Event',
            message=f'Пользователь {recipient.username} добавил событие '
                    f'{request.data["body"]} на дату '
                    f'{request.data["event_data"]}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient.email],
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=True)
    def subscribe(self, request, *args, **kwargs):
        event = self.get_object()
        user = self.request.user

        user.subscribe(event)

        serializer = self.serializer_class(event, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def remove_subscribe(self, request, *args, **kwargs):
        event = self.get_object()
        user = self.request.user

        user.remove_subscribe(event)

        serializer = self.serializer_class(event)

        return Response(serializer.data, status=status.HTTP_200_OK)


class EventsListSet(AbstractViewSet):
    http_method_names = ('get', )
    permission_classes = (UserPermission,)
    serializer_class = EventsListSerializer
    filterset_fields = ['admin__public_id']

    def get_queryset(self):
        return Event.objects.all()

    def get_object(self):
        obj = Event.objects.get_object_by_public_id(self.kwargs['pk'])

        self.check_object_permissions(self.request, obj)

        return obj

    def list(self, request, *args, **kwargs):
        try:
            admin_id = request.GET['admin__public_id']
            event_objects_list = cache.get(''.join(['event_objects_list_',
                                                    admin_id]))
            if event_objects_list is None:
                event_objects_list = self.filter_queryset(self.get_queryset())
                cache.set(''.join(['event_objects_list_', admin_id]),
                          event_objects_list)
        except MultiValueDictKeyError:
            event_objects = cache.get('event_objects_list')
            if event_objects is None:
                event_objects = self.get_queryset()
                cache.set('event_objects_list', event_objects)
        # if event_objects is None:
        #     event_objects = self.filter_queryset(self.get_queryset())
        #     cache.set('event_objects', event_objects)

        page = self.paginate_queryset(event_objects)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(event_objects, many=True)
        return Response(serializer.data)
