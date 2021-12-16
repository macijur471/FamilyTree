import React, { FunctionComponent } from "react";
import { MainWrapper } from "./Main.components";
import UserForm from "components/UserForm";
import { useUserContext } from "context/UserContext/useUserContext";

const Main: FunctionComponent = () => {
  const { isLoggedIn } = useUserContext();

  return <MainWrapper>{!isLoggedIn && <UserForm />}</MainWrapper>;
};

export default Main;
