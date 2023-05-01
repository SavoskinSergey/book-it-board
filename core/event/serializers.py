from django.conf import settings
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.abstract.serializers import AbstractSerializer
from core.event.models import Event
from core.account.models import User
from core.account.serializers import UserSerializer


class EventSerializer(AbstractSerializer):
    admin = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field='public_id'
    )
    subscribed = serializers.SerializerMethodField()
    subscribes_count = serializers.SerializerMethodField()
    boards_count = serializers.SerializerMethodField()

    def get_boards_count(self, instance):
        return instance.board_set.count()

    def get_subscribed(self, instance):
        request = self.context.get('request', None)

        if request is None or request.user.is_anonymous:
            return False

        return request.user.has_subscribed(instance)

    def get_subscribes_count(self, instance):
        return instance.subscribed_by.count()

    def validate_admin(self, value):
        if self.context['request'].user != value:
            raise ValidationError("You can't create a event for another user.")
        return value

    def update(self, instance, validated_data):
        if not instance.edited:
            validated_data['edited'] = True

        instance = super().update(instance, validated_data)

        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        admin = User.objects.get_object_by_public_id(representation['admin'])
        representation['admin'] = UserSerializer(
                                    admin, context=self.context
                                ).data
        if not representation['image']:
            representation['image'] = settings.DEFAULT_AVATAR_URL
            return representation
        if settings.DEBUG:  # debug enabled for dev
            request = self.context.get('request')
            representation['image'] = request.build_absolute_uri(
                representation['image']
            )
        return representation

    class Meta:
        model = Event
        # List of all the fields that can be included in a
        # request or a response
        fields = [
            'id',
            'admin',
            'body',
            'edited',
            'image',
            'subscribed',
            'subscribes_count',
            'duration',
            'boards_count',
            'created',
            'event_data',
            'event_limit',
            'updated']
        read_only_fields = ['edited']


class EventsListSerializer(AbstractSerializer):
    admin = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field='public_id'
    )
    subscribed = serializers.SerializerMethodField()
    subscribes_count = serializers.SerializerMethodField()
    boards_count = serializers.SerializerMethodField()

    def get_boards_count(self, instance):
        return instance.board_set.count()

    def get_subscribed(self, instance):
        request = self.context.get('request', None)

        if request is None or request.user.is_anonymous:
            return False

        return request.user.has_subscribed(instance)

    def get_subscribes_count(self, instance):
        return instance.subscribed_by.count()

    def validate_admin(self, value):
        if self.context['request'].user != value:
            raise ValidationError("You can't create a event for another user.")
        return value

    def update(self, instance, validated_data):
        if not instance.edited:
            validated_data['edited'] = True

        instance = super().update(instance, validated_data)

        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        admin = User.objects.get_object_by_public_id(representation['admin'])
        representation['admin'] = UserSerializer(
                                    admin, context=self.context
                                ).data
        return representation

    class Meta:
        model = Event
        # List of all the fields that can be included in a
        # request or a response
        fields = [
            'id',
            'admin',
            'body',
            'edited',
            'subscribed',
            'subscribes_count',
            'duration',
            'boards_count',
            'created',
            'event_data',
            'event_limit',
            'updated']
        read_only_fields = ['edited']
