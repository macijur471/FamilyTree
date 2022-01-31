import json
import pytest
import requests
from urllib3.util.retry import Retry
from requests.adapters import HTTPAdapter

pytest_plugins = ["docker_compose"]
creds = {'username': 'tester', 'password': 'password'}

@pytest.fixture(scope="session")
def wait_for_genealogy(session_scoped_container_getter):
    service = session_scoped_container_getter.get("haproxy").network_info[0]
    api_url = f"http://{service.hostname}:{service.host_port}"

    api = '/api/v1/genealogy'

    return wait_for_health_200(api_url, api)

@pytest.fixture(scope="session")
def wait_for_auth(session_scoped_container_getter):
    service = session_scoped_container_getter.get("haproxy").network_info[0]
    api_url = f"http://{service.hostname}:{service.host_port}"

    api = '/api/v1/auth/user'

    res =  wait_for_health_200(api_url, api)
    auth_register(res)

    return res 


@pytest.fixture(scope="session")
def auth(wait_for_auth, auth_user_creds):

    headers = {'content-type': 'application/json'}
    res = wait_for_auth['session'].post(
        f'{wait_for_auth["api_url"]}/login', data=auth_user_creds, headers=headers)

    assert res.status_code == 200

    data = res.json()

    return data['token']


@pytest.fixture(scope="session")
def auth_user_creds():
    return json.dumps(creds)


def create_auth_header(token):
    return {'Authorization': f'Bearer {token}'}


def auth_register(auth):
    body = json.dumps(creds)
    headers = {'content-type': 'application/json'}
    res = auth['session'].post(
        f'{auth["api_url"]}/register', data=body, headers=headers)

    assert res.status_code == 200
    return res.json()['token']


def wait_for_health_200(api_url, path):
    request_session = requests.Session()
    retries = Retry(total=10,
                    backoff_factor=0.1,
                    status_forcelist=[500, 502, 504])
    request_session.mount('http://', HTTPAdapter(max_retries=retries))

    assert request_session.get(f'{api_url}{path}/health').status_code == 200
    return {'session': request_session, 'api_url': f'{api_url}{path}'}
