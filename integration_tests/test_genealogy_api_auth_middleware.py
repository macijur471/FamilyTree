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
    def test_middleware_missing_auth_token_401(self, wait_for_apis):
        genealogy, _ = wait_for_apis

        res = genealogy['session'].get(f'{genealogy["api_url"]}/individuals')
        assert res.status_code == 401

    def test_middleware_correct_auth_token_allows_request(self, wait_for_apis, auth_user_creds):
        genealogy, auth = wait_for_apis

        token = get_auth_token(auth, auth_user_creds)

        headers = {'Authorization': f'Bearer {token}'}

        res = genealogy['session'].get(
            f'{genealogy["api_url"]}/individuals', headers=headers)
        assert res.status_code == 200

    def test_middleware_incorrect_auth_token_401(self, wait_for_apis, auth_user_creds):
        genealogy, auth = wait_for_apis

        token = get_auth_token(auth, auth_user_creds)
        token = token[:-1] + chr(ord(token[-1]) + 1)

        headers = {'Authorization': f'Bearer {token}'}

        res = genealogy['session'].get(
            f'{genealogy["api_url"]}/individuals', headers=headers)
        assert res.status_code == 401
