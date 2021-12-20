import React, { FunctionComponent } from "react";
import Modal from "components/shared/Modal";
import {
  AddModalHeaderText,
  AddModalHeaderWrapper,
  AddPersonForm,
  AddPersonInputRow,
} from "./AddPersonModal.components";
import BgBar from "components/shared/WrapperWithBgBar/BgBar";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "components/shared/Input";
import { REQUIRED_MSSG } from "utils/formConsts/userForm.consts";
import {
  FULLNAME_MAX_LENGTH,
  FULLNAME_MAX_LENGTH_MSSG,
  FULLNAME_MIN_LENGTH,
  FULLNAME_MIN_LENGTH_MSSG,
  FULLNAME_PATTERN,
  FULLNAME_PATTERN_MSSG,
  HOMETOWN_MAX_LENGTH,
  HOMETOWN_MAX_LENGTH_MSSG,
  HOMETOWN_MIN_LENGTH,
  HOMETOWN_MIN_LENGTH_MSSG,
  JOB_MAX_LENGTH,
  JOB_MAX_LENGTH_MSSG,
  JOB_MIN_LENGTH,
  JOB_MIN_LENGTH_MSSG,
} from "utils/formConsts/addPersonForm.consts";
import Button from "components/shared/Button";

interface Props {
  close?: () => void | Promise<void>;
  sourcePerson?: { fullName: string; dateOfBirth: string };
}

type Inputs = {
  fullName: string;
  hometown: string;
  dateOfBirth: string;
  dateOfDeath: string;
  job?: string;
};

const AddPersonModal: FunctionComponent<Props> = ({ close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Modal close={close} column>
      <AddModalHeaderWrapper>
        <AddModalHeaderText>Add relative</AddModalHeaderText>
        <BgBar color="light" width={340} />
      </AddModalHeaderWrapper>
      <AddPersonForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          theme="dark"
          label="Full name"
          errorMssg={errors.fullName?.message}
          register={register("fullName", {
            required: { value: true, message: REQUIRED_MSSG },
            pattern: {
              value: FULLNAME_PATTERN,
              message: FULLNAME_PATTERN_MSSG,
            },
            minLength: {
              value: FULLNAME_MIN_LENGTH,
              message: FULLNAME_MIN_LENGTH_MSSG,
            },
            maxLength: {
              value: FULLNAME_MAX_LENGTH,
              message: FULLNAME_MAX_LENGTH_MSSG,
            },
          })}
        />
        <Input
          theme="dark"
          label="Hometown"
          errorMssg={errors.hometown?.message}
          register={register("hometown", {
            required: { value: true, message: REQUIRED_MSSG },
            minLength: {
              value: HOMETOWN_MIN_LENGTH,
              message: HOMETOWN_MIN_LENGTH_MSSG,
            },
            maxLength: {
              value: HOMETOWN_MAX_LENGTH,
              message: HOMETOWN_MAX_LENGTH_MSSG,
            },
          })}
        />
        <AddPersonInputRow>
          <Input
            type="date"
            label="Date of Birth"
            errorMssg={errors.dateOfBirth?.message}
            register={register("dateOfBirth", {
              required: { value: true, message: REQUIRED_MSSG },
            })}
          />
          <Input
            type="date"
            label="Date of Death"
            errorMssg={errors.dateOfDeath?.message}
            register={register("dateOfDeath", {
              required: { value: true, message: REQUIRED_MSSG },
            })}
          />
        </AddPersonInputRow>
        <Input
          theme="dark"
          label="Job"
          errorMssg={errors.job?.message}
          register={register("job", {
            minLength: {
              value: JOB_MIN_LENGTH,
              message: JOB_MIN_LENGTH_MSSG,
            },
            maxLength: {
              value: JOB_MAX_LENGTH,
              message: JOB_MAX_LENGTH_MSSG,
            },
          })}
        />
        <Button type="submit" color="green">
          Add
        </Button>
      </AddPersonForm>
    </Modal>
  );
};

export default AddPersonModal;
