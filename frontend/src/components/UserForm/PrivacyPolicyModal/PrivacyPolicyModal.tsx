import Modal from "components/shared/Modal";
import React, { FunctionComponent } from "react";
import {
  PrivacyPolicyHeader,
  PrivacyPolicySubheader,
  PrivacyPolicyText,
} from "./PrivacyPolicyModal.components";

interface Props {
  close?: () => void | Promise<void>;
}
const PrivacyPolicyModal: FunctionComponent<Props> = ({ close }) => {
  return (
    <Modal close={close}>
      <PrivacyPolicyHeader>Privacy Policy</PrivacyPolicyHeader>

      <PrivacyPolicySubheader>
        Administrative information
      </PrivacyPolicySubheader>
      <PrivacyPolicyText>
        All personal data and any other information connected with user of our
        service are fully protected in accordance with the General Data
        Protection Regulation (GDPR) and other laws provisions in Republic of
        Poland.
      </PrivacyPolicyText>

      <PrivacyPolicySubheader>
        Collected personal information
      </PrivacyPolicySubheader>
      <PrivacyPolicyText>
        Service user decide which data submit to system. Although some of them
        are necessary to provide client with the service.
        <ul>
          <li>Username</li>
          <li>Password (hashed for greater security)</li>
          <li>
            Family members':
            <ul>
              <li>names</li>
              <li>hometowns</li>
              <li>genders</li>
              <li>jobs</li>
              <li>hobbies</li>
              <li>images</li>
              <li>relationships</li>
              <li>dates of birth</li>
              <li>dates of death</li>
            </ul>
          </li>
        </ul>
        All collected data are used only for creating personal family tree. No
        one else will have permission to access user data. Data are not
        disclosed to third parties.
      </PrivacyPolicyText>

      <PrivacyPolicySubheader>Managing data</PrivacyPolicySubheader>
      <PrivacyPolicyText>
        User have full access to own date inserted to the system. User can
        delete their data at any time. Deletion is permanent and irreversible.
        All personal information and data are shared only with the owner user
        after successful login.
      </PrivacyPolicyText>

      <PrivacyPolicySubheader>Security</PrivacyPolicySubheader>
      <PrivacyPolicyText>
        All information are stored at the server located in Republic of Poland.
        Server is protected from unauthorized access. Only authorized
        administrators can access the server.
      </PrivacyPolicyText>
    </Modal>
  );
};

export default PrivacyPolicyModal;
