from integration_tests.conftest import wait_for_genealogy


def get_auth_token(auth, body):
    headers = {'content-type': 'application/json'}
    res = auth['session'].post(
        f'{auth["api_url"]}/login', data=body, headers=headers)

    assert res.status_code == 200

    data = res.json()
    return data['token']


class TestMiddleware:
    # since middleware mechanism works for every endpoint in the same way
    # only one enpoint will be tested
    def test_middleware_missing_auth_token_401(self, wait_for_genealogy):
        genealogy = wait_for_genealogy

        res = genealogy['session'].get(f'{genealogy["api_url"]}/individuals')
        assert res.status_code == 401

    def test_middleware_correct_auth_token_allows_request(self, wait_for_genealogy, auth):
        genealogy = wait_for_genealogy

        headers = {'Authorization': f'Bearer {auth}'}
        headers['content-type'] = 'application/json'

        res = genealogy['session'].get(
            f'{genealogy["api_url"]}/individuals', headers=headers)
        assert res.status_code == 200

    def test_middleware_incorrect_auth_token_401(self, wait_for_genealogy, auth):
        genealogy = wait_for_genealogy

        # change token so it's invalid
        token = auth[:-1] + chr(ord(auth[-1]) + 1)
        headers = {'Authorization': f'Bearer {token}'}

        res = genealogy['session'].get(
            f'{genealogy["api_url"]}/individuals', headers=headers)
        assert res.status_code == 401
