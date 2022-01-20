import React, { FunctionComponent, useCallback } from "react";
import axios from "axios";
import Modal from "components/shared/Modal";
import { toast } from "react-toastify";
import { DELETE_PERSON_ERROR_TOASTID } from "utils/toast.ids";
import { PERSON_URL } from "utils/tree.routes";
import { isAxiosError } from "utils/typeGuards/isAxiosError.guard";
import {
  DeletePersonButtonsWrapper,
  DeletePersonModalText,
} from "./DeletePersonModal.components";
import { useTreeContext } from "context/TreeContext/useTreeContext";
import Button from "components/shared/Button";
import { isDeleteError } from "utils/typeGuards/isDeleteError.guard";

interface Props {
  id: string;
  name: string;
  close?: () => void | Promise<void>;
}

const DeletePersonModal: FunctionComponent<Props> = ({ close, id, name }) => {
  const { getTree } = useTreeContext();

  const handleDelete = useCallback(async () => {
    try {
      const res = await axios.delete(`${PERSON_URL}/${id}`);
      if (res.statusText === "OK" && close) {
        await getTree();
        close();
      }
    } catch (e) {
      if (!(e instanceof Error) || !e) return;

      let message = "Could not delete " + name;

      if (isAxiosError(e) && isDeleteError(e) && e.response?.data.error)
        message = e.response?.data.error;
      else if (isAxiosError(e)) message = e.message;

      toast.error(message, {
        toastId: DELETE_PERSON_ERROR_TOASTID,
      });
    }
  }, [id, name, close, getTree]);

  return (
    <Modal close={close} column small>
      <DeletePersonModalText>
        Are you sure you want to delete <strong>{name}</strong>?
      </DeletePersonModalText>
      <DeletePersonButtonsWrapper>
        <Button onClick={handleDelete} color="green">
          Yes
        </Button>
        <Button onClick={() => close && close()} color="red">
          No
        </Button>
      </DeletePersonButtonsWrapper>
    </Modal>
  );
};

export default DeletePersonModal;
