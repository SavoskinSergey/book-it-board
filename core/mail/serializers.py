from core.abstract.serializers import AbstractSerializer
from core.mail.models import Mail


class MailSerializer(AbstractSerializer):

    def validate_mail(self, value):
        if self.instance:
            return self.instance.mail
        return value

    def update(self, instance, validated_data):
        if not instance.edited:
            validated_data['edited'] = True

        instance = super().update(instance, validated_data)

        return instance

    class Meta:
        model = Mail
        fields = [
            'subject', 'body',
            'sender_name', 'sender_email', 'sender_phone',
            'recipient_name', 'recipient_email', 'recipient_phone',
            'event_status', 'status_send', 'send_by_mail', 'send_by_phone',
            'created_at'
            ]
        read_only_fields = ['edited']
