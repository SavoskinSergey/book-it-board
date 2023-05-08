from rest_framework.response import Response
from rest_framework import status

from core.abstract.viewsets import AbstractViewSet
from core.mail.models import Mail
from core.mail.serializers import MailSerializer


class MailViewSet(AbstractViewSet):
    http_method_names = ('post', 'get', 'put', 'patch', 'delete')
    # permission_classes = (UserPermission,)
    serializer_class = MailSerializer

    def get_queryset(self):
        queryset = Mail.objects.all()

        return queryset

    def get_object(self):
        token = self.kwargs['pk']
        obj = Mail.objects.get(token=token)
        # obj = Order.objects.get_object_by_public_id(self.kwargs['pk'])

        # self.check_object_permissions(self.request, obj)

        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
