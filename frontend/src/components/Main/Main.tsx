import React, { FunctionComponent } from "react";
import Loader from "components/Loader";
import { MainWrapper } from "./Main.components";
import UserForm from "components/UserForm";
import { useUserContext } from "context/UserContext/useUserContext";

const Main: FunctionComponent = () => {
  const { isPending, isLoggedIn } = useUserContext();
  return (
    <MainWrapper>
      {isPending && <Loader />}
      {!isPending && !isLoggedIn && <UserForm />}
    </MainWrapper>
  );
};

export default Main;
