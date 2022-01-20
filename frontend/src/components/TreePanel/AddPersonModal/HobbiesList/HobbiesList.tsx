import React, { FunctionComponent } from "react";
import { InputLabel } from "components/shared/Input/Input.components";
import { HobbiesListWrapper, HobbyItemWrapper } from "./HobbiesList.components";
import {
  FieldArrayMethodProps,
  FieldArrayWithId,
  UseFormRegister,
} from "react-hook-form";
import IconButton from "components/shared/IconButton";
import { ReactComponent as AddIcon } from "images/addItem.svg";
import { ReactComponent as DeleteIcon } from "images/deleteItem.svg";
import Input from "components/shared/Input";
import { AddPersonInputs as Inputs } from "utils/types/addPersonInputs.type";
import { REQUIRED_MSSG } from "utils/formConsts/userForm.consts";
import {
  HOBBY_MIN_LENGTH,
  HOBBY_MIN_LENGTH_MSSG,
  HOBBY_MAX_LENGTH,
  HOBBY_MAX_LENGTH_MSSG,
} from "utils/formConsts/addPersonForm.consts";

interface Props {
  fields: FieldArrayWithId<Inputs, "hobbies", "id">[];
  register: UseFormRegister<Inputs>;
  append: (
    value:
      | Partial<{
          name: string;
        }>
      | Partial<{
          name: string;
        }>[],
    options?: FieldArrayMethodProps | undefined
  ) => void | Promise<void>;
  remove: (index?: number | number[] | undefined) => void;
  errors?: { message: string; id: number }[];
}

const HobbiesList: FunctionComponent<Props> = ({
  fields,
  register,
  append,
  remove,
  errors = [],
}) => {
  return (
    <HobbiesListWrapper>
      <InputLabel>Hobbies</InputLabel>
      {fields.map((field, index) => (
        <HobbyItemWrapper key={field.id}>
          <Input
            label="Enter a hobby"
            noLabel
            register={register(`hobbies.${index}.name`, {
              required: { value: fields.length !== 1, message: REQUIRED_MSSG },
              minLength: {
                value: HOBBY_MIN_LENGTH,
                message: HOBBY_MIN_LENGTH_MSSG,
              },
              maxLength: {
                value: HOBBY_MAX_LENGTH,
                message: HOBBY_MAX_LENGTH_MSSG,
              },
            } as const)}
            theme="dark"
            errorMssg={errors.find((e) => e.id === index)?.message}
          />
          <IconButton
            color="red"
            icon={<DeleteIcon />}
            disabled={fields.length === 1}
            onClick={() => remove(index)}
          />
        </HobbyItemWrapper>
      ))}
      <IconButton
        color="green"
        icon={<AddIcon />}
        onClick={() => append({ name: "" })}
        disabled={fields.length > 5}
      />
    </HobbiesListWrapper>
  );
};

export default HobbiesList;
