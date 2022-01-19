from xml.dom.minidom import Element
from integration_tests.conftest import create_auth_header
import json
from faker import Faker

class Individual:
    faker = Faker()
    Faker.seed(0)

    def __init__(self, name, dob, gender, hometown, dod=None, job=None, relative=None, relation=None, role=None):
        self.names = name
        self.date_of_birth = dob
        self.date_of_death = dod
        self.gender = gender
        self.hometown = hometown
        self.job = job
        self.relative = relative
        self.relation = relation
        self.role = role

    def to_json(self):
        return json.dumps(self,
                      default=lambda o: dict((key, value) for key, value in o.__dict__.items() if value),
                      indent=4,
                      allow_nan=False)

    @staticmethod
    def fake(relative=None, role=None):
        ind = Individual(
                Individual.faker.name(),
                Individual.faker.date(),
                Individual.faker.random_element(elements=('male', 'female')),
                Individual.faker.city(),
                job=Individual.faker.job()
            )

        if relative is not None\
            and role is not None:
            ind.relative = relative
            ind.relation = Individual.faker.random_element(elements=('blood', 'adopted'))
            ind.role = role
        return ind

    @staticmethod
    def create_ind_wrapper(genealogy, username, data, headers):
        res = genealogy['session'].post(
            f'{genealogy["api_url"]}/individuals/{username}',
            data=data.to_json(),
            headers=headers
        )
        return res


class TestIndividualInFamily:


    def test_create_2_individuals_related(self, faker, wait_for_genealogy, auth):
        genealogy = wait_for_genealogy
        headers = create_auth_header(auth)
        headers['content-type'] = 'application/json'

        ind = Individual.fake()
        username = "".join(ind.names)

        res = Individual.create_ind_wrapper(genealogy, username, ind, headers)
        assert res.status_code == 201

        created_id = str(res.json()['id'])

        relative = Individual.fake(relative=created_id, role='parent')
        res = Individual.create_ind_wrapper(genealogy, username, relative, headers)
        assert res.status_code == 201

    def test_created_inds_ids_are_present_in_tree(self, wait_for_genealogy, auth):
        genealogy = wait_for_genealogy
        headers = create_auth_header(auth)
        headers['content-type'] = 'application/json'

        ind = Individual.fake()
        username = "".join(ind.names)

        res = Individual.create_ind_wrapper(genealogy, username, ind, headers)
        assert res.status_code == 201

        first_created_id = str(res.json()['id'])

        relative = Individual.fake(relative=first_created_id, role='parent')
        res = Individual.create_ind_wrapper(genealogy, username, relative, headers)
        assert res.status_code == 201
        second_created_id = str(res.json()['id'])

        ids = {first_created_id, second_created_id}

        res = genealogy['session'].get(
            f'{genealogy["api_url"]}/tree/{username}',
            headers=headers
        )

        assert res.status_code == 200
        
        data = res.json()
        
        relations = data['relations']
        assert ids == {indiv['id'] for indiv in relations}

    def test_created_inds_correct_root_id_in_a_tree(self, wait_for_genealogy, auth):
        genealogy = wait_for_genealogy
        headers = create_auth_header(auth)
        headers['content-type'] = 'application/json'

        ind = Individual.fake()
        username = "".join(ind.names)

        res = Individual.create_ind_wrapper(genealogy, username, ind, headers)
        assert res.status_code == 201

        first_created_id = str(res.json()['id'])

        relative = Individual.fake(relative=first_created_id, role='parent')
        res = Individual.create_ind_wrapper(genealogy, username, relative, headers)
        assert res.status_code == 201

        res = genealogy['session'].get(
            f'{genealogy["api_url"]}/tree/{username}',
            headers=headers
        )

        assert res.status_code == 200
        
        data = res.json()
        assert data['rootId'] == first_created_id

    def test_creating_duplicated_family_fails(self, wait_for_genealogy, auth):
        genealogy = wait_for_genealogy
        headers = create_auth_header(auth)
        headers['content-type'] = 'application/json'

        ind = Individual.fake()
        username = "".join(ind.names)

        res = Individual.create_ind_wrapper(genealogy, username, ind, headers)
        assert res.status_code == 201

        second_ind = Individual.fake()
        res = Individual.create_ind_wrapper(genealogy, username, second_ind, headers)
        assert res.status_code == 404

    def test_requesting_non_existing_tree_fails(self, wait_for_genealogy, auth):
        genealogy = wait_for_genealogy
        headers = create_auth_header(auth)
        headers['content-type'] = 'application/json'
        username = 'non_existing_user'


        res = genealogy['session'].get(
            f'{genealogy["api_url"]}/tree/{username}',
            headers=headers
        )

        assert res.status_code == 404

        data = res.json()
        assert data['message'] == 'There is not such a tree in our database'

    def test_creating_user_and_tree_correct(self, wait_for_genealogy, auth):
        genealogy = wait_for_genealogy
        headers = create_auth_header(auth)
        headers['content-type'] = 'application/json'

        ind = Individual.fake()
        username = "".join(ind.names)

        res = Individual.create_ind_wrapper(genealogy, username, ind, headers)
        assert res.status_code == 201


        res = genealogy['session'].get(
            f'{genealogy["api_url"]}/tree/{username}',
            headers=headers
        )

        assert res.status_code == 200 

    def test_root_family_delete_fails(self, wait_for_genealogy, auth):
        genealogy = wait_for_genealogy
        headers = create_auth_header(auth)
        headers['content-type'] = 'application/json'

        ind = Individual.fake()
        username = "".join(ind.names)

        res = Individual.create_ind_wrapper(genealogy, username, ind, headers)
        assert res.status_code == 201
        id = str(res.json()['id'])

        res = genealogy['session'].delete(
            f'{genealogy["api_url"]}/individuals/{id}',
            headers=headers
        )

        assert res.status_code == 406

    def test_delete_relative_from_family_success(self, wait_for_genealogy, auth):
        genealogy = wait_for_genealogy
        headers = create_auth_header(auth)
        headers['content-type'] = 'application/json'

        ind = Individual.fake()
        username = "".join(ind.names)

        res = Individual.create_ind_wrapper(genealogy, username, ind, headers)
        assert res.status_code == 201
        first_created_id = str(res.json()['id'])

        relative = Individual.fake(relative=first_created_id, role='parent')
        res = Individual.create_ind_wrapper(genealogy, username, relative, headers)
        assert res.status_code == 201
        second_created_id = str(res.json()['id'])


        res = genealogy['session'].delete(
            f'{genealogy["api_url"]}/individuals/{second_created_id}',
            headers=headers
        )

        assert res.status_code == 200
        assert res.json()['success'] == True


