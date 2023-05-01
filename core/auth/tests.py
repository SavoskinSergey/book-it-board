import pytest
from rest_framework import status
from core.fixtures.user import user # noqa


class TestAuthenticationViewSet:
    endpoint = '/api/auth/'

    def test_login(self, client, user): # noqa
        data = {'username': user.username, 'password': 'test_password'}
        response = client.post(self.endpoint + 'login/', data)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['access']
        assert response.data['user']['id'] == user.public_id.hex
        assert response.data['user']['username'] == user.username
        assert response.data['user']['email'] == user.email

    @pytest.mark.django_db
    def test_register(self, client):
        data = {
            'username': 'ivan',
            'first_name': 'Ivan',
            'last_name': 'Ivanov',
            'password': '12345678',
            'email': 'ivan@mail.ru',
            'phone_number': '+79088767245'
        }

        response = client.post(self.endpoint + 'register/', data)
        assert response.status_code == status.HTTP_201_CREATED

    def test_refresh(self, client, user): # noqa
        data = {'username': user.username, 'password': 'test_password'}
        response = client.post(self.endpoint + 'login/', data)

        assert response.status_code == status.HTTP_200_OK

        data_refresh = {'refresh': response.data['refresh']}

        response = client.post(self.endpoint + 'refresh/', data_refresh)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['access']

    def test_logout(self, client, user): # noqa
        data = {'username': user.username, 'password': 'test_password'}

        response = client.post(self.endpoint + 'login/', data)

        assert response.status_code == status.HTTP_200_OK

        client.force_authenticate(user=user)

        data_refresh = {'refresh': response.data['refresh']}

        response = client.post(self.endpoint + 'logout/', data_refresh)
        assert response.status_code == status.HTTP_204_NO_CONTENT
