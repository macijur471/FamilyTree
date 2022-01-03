import json
import pytest
import requests
from urllib3.util.retry import Retry
from requests.adapters import HTTPAdapter

pytest_plugins = ["docker_compose"]


@pytest.fixture(scope="class")
def wait_for_apis(class_scoped_container_getter):
    service = class_scoped_container_getter.get("haproxy").network_info[0]
    api_url = f"http://{service.hostname}:{service.host_port}"

    apis = ['/api/v1/genealogy', '/api/v1/auth/user']

    results = [wait_for_health_200(api_url, api) for api in apis]
    auth_register(results[1])

    return results


@pytest.fixture(scope="session")
def auth_user_creds():
    body = {'username': 'username', 'password': 'password'}

    return json.dumps(body)


def auth_register(auth):
    body = {'username': 'username', 'password': 'password'}
    headers = {'content-type': 'application/json'}
    res = auth['session'].post(
        f'{auth["api_url"]}/register', data=json.dumps(body), headers=headers)

    assert res.status_code == 200


def wait_for_health_200(api_url, path):
    request_session = requests.Session()
    retries = Retry(total=10,
                    backoff_factor=0.1,
                    status_forcelist=[500, 502, 504])
    request_session.mount('http://', HTTPAdapter(max_retries=retries))

    assert request_session.get(f'{api_url}{path}/health').status_code == 200
    return {'session': request_session, 'api_url': f'{api_url}{path}'}
