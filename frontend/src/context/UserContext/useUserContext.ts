import { useContext } from "react";
import UserContext from "./User.context";

export const useUserContext = () => {
  const userData = useContext(UserContext);
  return { ...userData };
};
