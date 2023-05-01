from rest_framework import status

from core.fixtures.user import user # noqa
from core.fixtures.event import event # noqa


class TestEventViewSet:
    endpoint = '/api/event/'

    ###########################################################################
    ########### Authenticated User Tests ###################################### # noqa
    ###### These tests are only run if the user is authenticated ############## # noqa

    def test_list(self, client, user, event): # noqa
        client.force_authenticate(user=user)
        response = client.get(self.endpoint)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 1

    def test_retrieve(self, client, user, event): # noqa
        client.force_authenticate(user=user)
        response = client.get(self.endpoint + str(event.public_id) + '/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['id'] == event.public_id.hex
        assert response.data['body'] == event.body
        assert response.data['admin']['id'] == event.admin.public_id.hex

    def test_create(self, client, user): # noqa
        client.force_authenticate(user=user)
        data = {'body': 'Test Event discription', 'admin': user.public_id.hex}
        response = client.post(self.endpoint, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['body'] == data['body']
        assert response.data['admin']['id'] == user.public_id.hex

    def test_update(self, client, user, event): # noqa
        client.force_authenticate(user=user)
        data = {'body': 'Test Event Body New', 'admin': user.public_id.hex}
        response = client.put(self.endpoint + str(event.public_id) + '/', data)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['body'] == data['body']

    def test_delete(self, client, user, event): # noqa
        client.force_authenticate(user=user)
        response = client.delete(self.endpoint + str(event.public_id) + '/')
        assert response.status_code == status.HTTP_204_NO_CONTENT

    ###########################################################################
    ########## Testing anonymous user ######################################### # noqa
    ####### These tests are only run if the user is not authenticated ######### # noqa

    def test_list_anonymous(self, client, event): # noqa
        response = client.get(self.endpoint)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 1

    def test_retrieve_anonymous(self, client, event): # noqa
        response = client.get(self.endpoint + str(event.public_id) + '/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['id'] == event.public_id.hex
        assert response.data['body'] == event.body
        assert response.data['admin']['id'] == event.admin.public_id.hex

    def test_create_anonymous(self, client):
        data = {'body': 'Test Fake Event', 'admin': 'test_user'}
        response = client.post(self.endpoint, data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_update_anonymous(self, client, event): # noqa
        data = {'body': 'Update Event Body', 'admin': 'test_user'}
        response = client.put(self.endpoint + str(event.public_id) + '/', data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_delete_anonymous(self, client, event): # noqa
        response = client.delete(self.endpoint + str(event.public_id) + '/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
