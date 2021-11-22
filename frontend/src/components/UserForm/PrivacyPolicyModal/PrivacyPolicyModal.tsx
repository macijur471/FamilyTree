import Modal from "components/shared/Modal";
import React, { FunctionComponent } from "react";
import { PrivacyPolicyHeader } from "./PrivacyPolicyModal.components";

interface Props {
  close?: () => void | Promise<void>;
}
const PrivacyPolicyModal: FunctionComponent<Props> = ({ close }) => {
  return (
    <Modal close={close}>
      <PrivacyPolicyHeader>Privacy Policy</PrivacyPolicyHeader>
    </Modal>
  );
};

export default PrivacyPolicyModal;
