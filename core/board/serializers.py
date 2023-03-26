from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.abstract.serializers import AbstractSerializer
from core.account.models import User
from core.account.serializers import UserSerializer
from core.board.models import Board
from core.event.models import Event


class BoardSerializer(AbstractSerializer):
    operator = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')
    event = serializers.SlugRelatedField(queryset=Event.objects.all(), slug_field='public_id')

    def validate_operator(self, value):
        if self.context["request"].user != value:
            raise ValidationError("You can't create a support board for another user.")
        return value

    def validate_event(self, value):
        if self.instance:
            return self.instance.event
        return value

    def update(self, instance, validated_data):
        if not instance.edited:
            validated_data['edited'] = True

        instance = super().update(instance, validated_data)

        return instance

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        operator = User.objects.get_object_by_public_id(rep["operator"])
        rep["operator"] = UserSerializer(operator).data

        return rep

    class Meta:
        model = Board
        # List of all the fields that can be included in a request or a response
        fields = ['id', 'event', 'operator', 'comment', 'edited', 'created', 'updated']
        read_only_fields = ["edited"]