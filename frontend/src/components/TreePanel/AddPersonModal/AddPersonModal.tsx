import React, { FunctionComponent } from "react";
import Modal from "components/shared/Modal";

interface Props {
  close?: () => void | Promise<void>;
}
const AddPersonModal: FunctionComponent<Props> = ({ close }) => {
  return <Modal close={close}>hemlo</Modal>;
};

export default AddPersonModal;
