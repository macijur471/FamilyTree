import React, { FunctionComponent } from "react";
import { MainWrapper } from "./Main.components";
import UserForm from "components/UserForm";
import { useUserContext } from "context/UserContext/useUserContext";
import TreePanel from "components/TreePanel";

const Main: FunctionComponent = () => {
  const { isLoggedIn } = useUserContext();

  return (
    <MainWrapper>
      {/* {!isLoggedIn && <UserForm />} 
      {isLoggedIn && <TreePanel />}*/}
      <TreePanel />
    </MainWrapper>
  );
};

export default Main;
