from rest_framework import serializers
from core.abstract.serializers import AbstractSerializer
from core.account.models import User
from core.account.serializers import UserSerializer
from core.event.serializers import EventSerializer
from core.order.models import Order
from core.event.models import Event


class OrderSerializer(AbstractSerializer):
    event = serializers.SlugRelatedField(
        queryset=Event.objects.all(),
        slug_field='public_id'
        )
    account = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field='public_id'
        )

    # def validate_operator(self, value):
    #     if self.context['request'].user != value:
    #         raise ValidationError("You can't create a support
    #  board for another user.")
    #     return value

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
        account = User.objects.get_object_by_public_id(rep['account'])
        rep['account'] = UserSerializer(account, context=self.context).data
        event = Event.objects.get_object_by_public_id(rep['event'])
        rep['event'] = EventSerializer(event, context=self.context).data

        return rep

    class Meta:
        model = Order
        fields = ['id', 'event', 'account', 'status', 'comment', 'token']
        read_only_fields = ['edited']
