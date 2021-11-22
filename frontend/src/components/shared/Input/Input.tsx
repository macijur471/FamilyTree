import React, { FunctionComponent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
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
  type?: "text" | "password";
  register?: UseFormRegisterReturn;
}

const Input: FunctionComponent<Props> = ({
  label,
  register,
  errorMssg,
  placeholder = `${label}...`,
  type = "text",
}) => {
  return (
    <InputWrapper>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <InputElement
        name={label}
        id={label}
        placeholder={placeholder}
        type={type}
        {...register}
      />
      <InputUnderline />
      <InputError data-cy="input-error" data-testid="input-error">
        {errorMssg}
      </InputError>
    </InputWrapper>
  );
};

export default Input;
