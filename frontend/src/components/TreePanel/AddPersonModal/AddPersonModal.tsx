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
import axios from "axios";
import { PERSON_URL } from "utils/tree.routes";
import GenderSelect from "./GenderSelect";
import { AddPersonInputs as Inputs } from "utils/types/addPersonInputs.type";
import { useTreeContext } from "context/TreeContext/useTreeContext";
import { useUserContext } from "context/UserContext/useUserContext";
import { relationToStr } from "utils/functions/relationToStr";
import { roleToStr } from "utils/functions/roleToStr";
import { toast } from "react-toastify";
import { handleErrorMssg } from "utils/functions/handleErrorMssg";
import { ADD_PERSON_ERROR_TOASTID } from "utils/toast.ids";

interface Props {
  close?: () => void | Promise<void>;
  sourcePerson?: { fullName: string; dateOfBirth: string; id: string };
}

const AddPersonModal: FunctionComponent<Props> = ({ close, sourcePerson }) => {
  const { peopleData, getTree } = useTreeContext();
  const { username } = useUserContext();

  const {
    register,
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      hobbies: [{ name: "" }],
      relations: [
        {
          relation: "parent",
          name: sourcePerson?.fullName.toLocaleLowerCase(),
        },
      ],
    },
  });

  const watchImages = watch("images", undefined);
  const watchRelations = watch("relations");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const r = useFieldArray({
    control,
    name: "relations",
  });

  const relFields = r.fields;
  const relAppend = r.append;
  const relRemove = r.remove;

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //check if birth is before death
    if (new Date(data.dateOfBirth) > new Date(data.dateOfDeath)) {
      setError(
        "dateOfBirth",
        { message: "Date of birth cannot be after date of death!" },
        { shouldFocus: true }
      );
      return;
    }

    //check if some person is not twice
    let isTwice = false;
    watchRelations?.forEach((person, index) => {
      watchRelations?.forEach((p, i) => {
        if (person.name === p.name && index !== i) isTwice = true;
      });
    });
    if (isTwice) {
      toast.error("You can only have one relationship with one person!");
      return;
    }

    let person: { [k: string]: any } = {
      names: data.fullName,
      date_of_birth: data.dateOfBirth,
      gender: data.gender,
      hometown: data.hometown,
    };

    //if date of death is specified
    if (data.dateOfDeath) person.date_of_death = data.dateOfDeath;

    //if job is specified
    if (data.dateOfDeath) person.job = data.job;

    //if it's not the tree first person
    if (sourcePerson && data.relations) {
      person.relatives = data.relations.map((r) => ({
        relative:
          peopleData.find((p) => p.fullName.toLocaleLowerCase() === r.name)
            ?.userId ?? "",
        relation: relationToStr(r.relation),
        role: roleToStr(r.relation),
      }));
    } else person.relatives = [];

    try {
      const res = await axios.post(`${PERSON_URL}/${username}`, person);

      if (res?.status === 201) {
        await getTree();
        if (close) close();
      }
    } catch (e) {
      if (!(e instanceof Error) || !e) return;

      handleErrorMssg(e, ADD_PERSON_ERROR_TOASTID);
    }
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
        <GenderSelect register={register("gender")} />
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
            name={sourcePerson.fullName}
            register={register}
            fields={relFields}
            append={relAppend}
            remove={relRemove}
            current={watchRelations}
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
