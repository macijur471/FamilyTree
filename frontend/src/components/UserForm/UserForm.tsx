import React, { FunctionComponent, useCallback, useState } from "react";
import Button from "components/shared/Button";
import Input from "components/shared/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  MainFormWrapper,
  MainFormInside,
  UserFormBttns,
  UserFormButton,
  UserFormWrapper,
} from "./UserForm.components";
import {
  REQUIRED_MSSG,
  USERNAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH_MSSG,
  USERNAME_MIN_LENGTH,
  USERNAME_MIN_LENGTH_MSSG,
  PASSWD_MAX_LENGTH,
  PASSWD_MAX_LENGTH_MSSG,
  PASSWD_MIN_LENGTH,
  PASSWD_MIN_LENGTH_MSSG,
} from "utils/formConsts/userForm.consts";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";
import { LOGIN_URL, REGISTER_URL } from "utils/auth.routes";
import { useUserContext } from "context/UserContext/useUserContext";
import { UserFormResponseT } from "utils/types/responses/userFormResponse.type";
import axios from "axios";
import { USER_FORM_ERROR_TOASTID } from "utils/toast.ids";
import { handleErrorMssg } from "utils/functions/handleErrorMssg";

type Inputs = {
  username: string;
  password: string;
  privacyPolicy?: boolean;
};

const UserForm: FunctionComponent = () => {
  const [active, setIsActive] = useState(0); // 0 - login form, 1 - register form

  const { changeUserContextValue } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await axios.post<UserFormResponseT>(
        active === 0 ? LOGIN_URL : REGISTER_URL,
        {
          username: data.username,
          password: data.password,
        }
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      changeUserContextValue({
        username: data.username,
        isLoggedIn: res.data.status,
      });
    } catch (e) {
      if (!(e instanceof Error)) return;
      handleErrorMssg(e, USER_FORM_ERROR_TOASTID);
    }
  };

  const changeForm = useCallback(
    (num: 0 | 1) => {
      setIsActive(num);
      clearErrors();
    },
    [clearErrors]
  );

  return (
    <UserFormWrapper>
      <UserFormBttns>
        <UserFormButton isActive={active === 0} onClick={() => changeForm(0)}>
          Log in
        </UserFormButton>
        <UserFormButton isActive={active === 1} onClick={() => changeForm(1)}>
          Register
        </UserFormButton>
      </UserFormBttns>
      <MainFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <MainFormInside aria-label="user-form">
          <Input
            label="Username"
            register={register("username", {
              required: { value: true, message: REQUIRED_MSSG },
              maxLength: {
                value: USERNAME_MAX_LENGTH,
                message: USERNAME_MAX_LENGTH_MSSG,
              },
              minLength: {
                value: USERNAME_MIN_LENGTH,
                message: USERNAME_MIN_LENGTH_MSSG,
              },
            })}
            errorMssg={errors.username?.message}
          />
          <Input
            label="Password"
            register={register("password", {
              required: { value: true, message: REQUIRED_MSSG },
              maxLength: {
                value: PASSWD_MAX_LENGTH,
                message: PASSWD_MAX_LENGTH_MSSG,
              },
              minLength: {
                value: PASSWD_MIN_LENGTH,
                message: PASSWD_MIN_LENGTH_MSSG,
              },
            })}
            errorMssg={errors.password?.message}
            type="password"
          />
          {active === 1 && (
            <PrivacyPolicyCheckbox
              isError={!!errors.privacyPolicy}
              register={register("privacyPolicy", { required: true })}
            />
          )}
          <Button type="submit">{active === 0 ? "Log in" : "Register"}</Button>
        </MainFormInside>
      </MainFormWrapper>
    </UserFormWrapper>
  );
};

export default UserForm;
