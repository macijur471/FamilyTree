import React, { FunctionComponent } from "react";
import { MainWrapper } from "./Main.components";
import UserForm from "components/UserForm";
import { useUserContext } from "context/UserContext/useUserContext";
import TreePanel from "components/TreePanel";
import TreeContextProvider from "context/TreeContext/TreeContext.provider";

const Main: FunctionComponent = () => {
  const { isLoggedIn } = useUserContext();

  return (
    <MainWrapper>
      {/* {!isLoggedIn && <UserForm />}
      {isLoggedIn && (
        <TreeContextProvider>
          <TreePanel />
        </TreeContextProvider>
      )} */}
      <TreeContextProvider>
        <TreePanel />
      </TreeContextProvider>
    </MainWrapper>
  );
};

export default Main;
