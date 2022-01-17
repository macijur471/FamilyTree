import React, { FunctionComponent } from "react";
import {
  InputError,
  InputLabel,
} from "components/shared/Input/Input.components";
import Select from "components/shared/Select";
import { UseFormRegisterReturn } from "react-hook-form";
import {
  RelationDescription,
  RelationSelectWrapper,
} from "./RelationSelect.components";

interface Props {
  register?: UseFormRegisterReturn;
  name: string;
  options: string[];
  errorMssg?: string;
}

const RelationSelect: FunctionComponent<Props> = ({
  register,
  name,
  options,
  errorMssg,
}) => {
  return (
    <RelationSelectWrapper>
      <InputLabel htmlFor="relation">Relation</InputLabel>
      <RelationDescription>
        This person is <strong>{name}'s</strong>
      </RelationDescription>
      <Select
        theme="dark"
        options={options}
        register={register}
        name="relation"
      />
      <InputError>{errorMssg}</InputError>
    </RelationSelectWrapper>
  );
};

export default RelationSelect;
