import React, { FunctionComponent, useMemo } from "react";
import {
  InputError,
  InputLabel,
} from "components/shared/Input/Input.components";
import Select from "components/shared/Select";
import { AddPersonInputs as Inputs } from "utils/types/addPersonInputs.type";
import {
  RelationSelectIsTile,
  RelationSelectRow,
  RelationSelectWrapper,
} from "./RelationSelect.components";
import {
  FieldArrayMethodProps,
  FieldArrayWithId,
  UseFormRegister,
} from "react-hook-form";
import { relOptionsT } from "utils/types/relationOptions.type";
import IconButton from "components/shared/IconButton";
import { ReactComponent as AddIcon } from "images/addItem.svg";
import { ReactComponent as DeleteIcon } from "images/deleteItem.svg";
import { useTreeContext } from "context/TreeContext/useTreeContext";

interface Props {
  register: UseFormRegister<Inputs>;
  name: string;
  fields: FieldArrayWithId<Inputs, "relations", "id">[];
  append: (
    value: Partial<{
      name: string;
      relation: relOptionsT;
    }>,
    options?: FieldArrayMethodProps | undefined
  ) => void | Promise<void>;
  remove: (index?: number | number[] | undefined) => void;
  current?: { name: string; relation: relOptionsT }[];
}

const RelationSelect: FunctionComponent<Props> = ({
  register,
  name,
  fields,
  append,
  remove,
  current,
}) => {
  const { peopleData } = useTreeContext();

  //filter currently selected people out
  const available = useMemo(
    () =>
      peopleData.filter((p) => {
        let filter = true;
        if (current)
          current.forEach((c) => {
            if (p.fullName.toLocaleLowerCase() === c.name.toLocaleLowerCase())
              filter = false;
          });
        return filter;
      }),
    [current, peopleData]
  );

  return (
    <RelationSelectWrapper>
      <InputLabel htmlFor="relation">Relations with this person</InputLabel>
      {fields.map((field, index) => (
        <RelationSelectRow key={field.id}>
          <Select
            theme="dark"
            options={index === 0 ? [name] : peopleData.map((p) => p.fullName)}
            register={register(`relations.${index}.name`)}
            title={field.name}
          />
          <RelationSelectIsTile>is</RelationSelectIsTile>
          <Select
            theme="dark"
            options={[
              "Parent",
              "Child",
              "Sibling",
              "Adopted parent",
              "Adopted child",
              "Adopted sibling",
              "Spouse",
              "Divorced",
            ]}
            register={register(`relations.${index}.relation`)}
          />
          <IconButton
            color="red"
            icon={<DeleteIcon />}
            disabled={index === 0 || fields.length === 1}
            onClick={() => remove(index)}
          />
        </RelationSelectRow>
      ))}
      <IconButton
        color="green"
        icon={<AddIcon />}
        onClick={() => {
          append({
            name: available[0].fullName.toLocaleLowerCase(),
            relation: "parent",
          });
        }}
        disabled={fields.length === peopleData.length}
      />
    </RelationSelectWrapper>
  );
};

export default RelationSelect;
