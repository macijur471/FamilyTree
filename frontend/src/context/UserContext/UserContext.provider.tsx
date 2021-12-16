import React, { FunctionComponent, useCallback, useState } from "react";
import UserContext, { UserContextDataType } from "./User.context";

const UserContextProvider: FunctionComponent = ({ children }) => {
  const [userData, setUserData] = useState({ isLoggedIn: false, username: "" });

  const changeUserContextValue = useCallback(
    (obj: {
      [P in keyof UserContextDataType]?: UserContextDataType[P];
    }) => {
      setUserData({ ...userData, ...obj });
    },
    [userData]
  );

  return (
    <UserContext.Provider value={{ ...userData, changeUserContextValue }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
