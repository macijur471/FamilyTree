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
  title?: string;
}

const Select: FunctionComponent<Props> = ({
  options,
  register,
  name,
  theme = "light",
  title,
}) => {
  return (
    <SelectWrapper>
      <SelectElement id={name} title={title} {...register}>
        {options.map((o) => (
          <SelectOption key={o} value={o.toLocaleLowerCase()}>
            {o}
          </SelectOption>
        ))}
      </SelectElement>
      <SelectUnderline themeColor={theme} />
    </SelectWrapper>
  );
};

export default Select;
