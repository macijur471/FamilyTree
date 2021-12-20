import React, { FunctionComponent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { dateToString } from "utils/functions/dateToString";
import {
  InputElement,
  InputError,
  InputLabel,
  InputUnderline,
  InputWrapper,
} from "./Input.components";

interface Props {
  label: string;
  placeholder?: string;
  errorMssg?: string;
  type?: "text" | "password" | "date";
  register?: UseFormRegisterReturn;
  theme?: "light" | "dark";
  noLabel?: boolean;
}

const Input: FunctionComponent<Props> = ({
  label,
  register,
  errorMssg,
  placeholder = `${label}...`,
  type = "text",
  theme = "light",
  noLabel = false,
}) => {
  return (
    <InputWrapper>
      {!noLabel && <InputLabel htmlFor={label}>{label}</InputLabel>}
      <InputElement
        name={label}
        id={label}
        placeholder={placeholder}
        type={type}
        max={type === "date" ? dateToString(new Date()) : undefined}
        {...register}
      />
      <InputUnderline themeColor={theme} />
      <InputError data-cy="input-error" data-testid="input-error">
        {errorMssg}
      </InputError>
    </InputWrapper>
  );
};

export default Input;
