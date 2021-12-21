import React, { FunctionComponent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import {
  SelectElement,
  SelectOption,
  SelectUnderline,
  SelectWrapper,
} from "./Select.components";

interface Props {
  theme?: "light" | "dark";
  options: string[];
  register?: UseFormRegisterReturn;
  name?: string;
}

const Select: FunctionComponent<Props> = ({
  options,
  register,
  name,
  theme = "light",
}) => {
  return (
    <SelectWrapper>
      <SelectElement id={name} {...register}>
        {options.map((o) => (
          <SelectOption key={o}>{o}</SelectOption>
        ))}
      </SelectElement>
      <SelectUnderline themeColor={theme} />
    </SelectWrapper>
  );
};

export default Select;
