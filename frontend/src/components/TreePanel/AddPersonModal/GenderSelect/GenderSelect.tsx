import React, { FunctionComponent } from "react";
import { GenderSelectWrapper } from "./GenderSelect.components";
import {
  InputError,
  InputLabel,
} from "components/shared/Input/Input.components";
import { UseFormRegisterReturn } from "react-hook-form";
import Select from "components/shared/Select";

interface Props {
  register?: UseFormRegisterReturn;
}
const GenderSelect: FunctionComponent<Props> = ({ register }) => {
  return (
    <GenderSelectWrapper>
      <InputLabel htmlFor="gender">Gender</InputLabel>
      <Select
        theme="dark"
        options={["male", "female"]}
        register={register}
        name="gender"
      />
      <InputError />
    </GenderSelectWrapper>
  );
};

export default GenderSelect;
