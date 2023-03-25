from core.abstract.serializers import AbstractSerializer
from core.account.models import User


class UserSerializer(AbstractSerializer):
    class Meta:
        model = User
        # List of all the fields that can be included in a request or a response
        fields = ['id', 'username', 'name', 'first_name', 'last_name', 'note', 'avatar', 'email', 'phone_number','is_active','created', 'updated']
        # List of all the fields that can only be read by the user
        read_only_field = ['is_active']