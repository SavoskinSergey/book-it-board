from django.http.response import Http404

from rest_framework.response import Response
from rest_framework import status

from core.abstract.viewsets import AbstractViewSet
from core.order.models import Order
from core.order.serializers import OrderSerializer
from core.auth.permissions import UserPermission


class OrderViewSet(AbstractViewSet):
    http_method_names = ('post', 'get', 'put', 'patch', 'delete')
    permission_classes = (UserPermission,)
    serializer_class = OrderSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Order.objects.all()

        event_pk = self.kwargs['event_pk']
        if event_pk is None:
            return Http404
        queryset = Order.objects.filter(event__public_id=event_pk)

        return queryset

    def get_object(self):
        token = self.kwargs['pk']
        obj = Order.objects.get(token=token)
        # obj = Order.objects.get_object_by_public_id(self.kwargs['pk'])

        self.check_object_permissions(self.request, obj)

        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
