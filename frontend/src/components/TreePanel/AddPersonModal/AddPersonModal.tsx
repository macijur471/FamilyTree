import React, { FunctionComponent } from "react";
import Modal from "components/shared/Modal";
import {
  AddModalHeaderText,
  AddModalHeaderWrapper,
  AddPersonForm,
  AddPersonInputRow,
} from "./AddPersonModal.components";
import BgBar from "components/shared/WrapperWithBgBar/BgBar";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
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
import HobbiesList from "./HobbiesList";
import RelationSelect from "./RelationSelect";
import ImagesInput from "./ImagesInput";
import { relOptionsT } from "utils/types/relationOptions.type";

interface Props {
  close?: () => void | Promise<void>;
  sourcePerson?: { fullName: string; dateOfBirth: string };
}

const relOptions: relOptionsT[] = [
  "Parent",
  "Child",
  "Sibling",
  "Adopted child",
  "Adopted parent",
  "Spouse",
  "Divorced",
];

type Inputs = {
  fullName: string;
  hometown: string;
  dateOfBirth: string;
  dateOfDeath: string;
  job?: string;
  hobbies: { name: string }[];
  relation?: relOptionsT;
  images?: FileList;
};

const AddPersonModal: FunctionComponent<Props> = ({ close, sourcePerson }) => {
  const {
    register,
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { hobbies: [{ name: "" }] } });

  const watchBirthDate = watch("dateOfBirth", "");
  const watchImages = watch("images", undefined);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const hobbiesErrors =
    errors.hobbies !== undefined
      ? errors.hobbies
          ?.filter((e) => e !== undefined)
          .map((e) => {
            const match = e.name?.ref?.name.match(/[0-9]+/) ?? ["-1"];

            return {
              message: e.name?.message ?? "",
              id: parseInt(match[0]),
            };
          })
      : [];

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //check if birth is before death
    if (new Date(data.dateOfBirth) > new Date(data.dateOfDeath)) {
      setError(
        "dateOfBirth",
        { message: "Date of birth cannot be after date of death!" },
        { shouldFocus: true }
      );
      return;
    }
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
            theme="dark"
            type="date"
            label="Date of Birth"
            errorMssg={errors.dateOfBirth?.message}
            register={register("dateOfBirth", {
              required: { value: true, message: REQUIRED_MSSG },
            })}
          />
          <Input
            theme="dark"
            type="date"
            label="Date of Death"
            errorMssg={errors.dateOfDeath?.message}
            register={register("dateOfDeath")}
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
        <HobbiesList
          fields={fields}
          register={register}
          append={append}
          remove={remove}
          errors={hobbiesErrors}
        />
        {sourcePerson && (
          <RelationSelect
            options={relOptions}
            name={sourcePerson.fullName}
            errorMssg={errors.relation?.message}
            register={register("relation", {
              validate: (relation) => {
                switch (relation) {
                  case "Parent":
                  case "Adopted parent": {
                    if (
                      new Date(sourcePerson.dateOfBirth) <=
                        new Date(watchBirthDate) ||
                      watchBirthDate === ""
                    )
                      return `This person cannot be ${sourcePerson.fullName}'s parent!`;
                    return true;
                  }
                  case "Child":
                  case "Adopted child": {
                    if (
                      new Date(sourcePerson.dateOfBirth) >=
                        new Date(watchBirthDate) ||
                      watchBirthDate === ""
                    )
                      return `This person cannot be ${sourcePerson.fullName}'s child!`;
                    return true;
                  }
                  default:
                    return true;
                }
              },
            })}
          />
        )}
        <ImagesInput register={register("images")} images={watchImages} />
        <Button type="submit" color="green">
          Add
        </Button>
      </AddPersonForm>
    </Modal>
  );
};

export default AddPersonModal;
