import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import UserContext, { UserContextDataType } from "./User.context";

const UserContextProvider: FunctionComponent = ({ children }) => {
  const [userData, setUserData] = useState({ isLoggedIn: false, username: "" });
  const [isPending, setIsPending] = useState(true);

  const changeUserContextValue = useCallback(
    (obj: {
      [P in keyof UserContextDataType]?: UserContextDataType[P];
    }) => {
      setUserData({ ...userData, ...obj });
    },
    [userData]
  );

  useEffect(() => {
    const checkUser = async () => {
      //TODO query for checking if user is logged in (?)
      setTimeout(() => {
        setIsPending(false);
      }, 2000);
    };

    checkUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ ...userData, isPending, changeUserContextValue }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
