import React, { FunctionComponent } from "react";
import { HeaderTextContent, HeaderWrapper } from "./Header.components";
import { useUserContext } from "context/UserContext/useUserContext";
import BgBar from "components/shared/WrapperWithBgBar/BgBar";

const Header: FunctionComponent = () => {
  const { username } = useUserContext();

  return (
    <HeaderWrapper as="header">
      <HeaderTextContent>
        {username && `Tree of ${username}`}
        {!username && "Family tree generator"}
      </HeaderTextContent>
      <BgBar width={509} color="dark" top={50} />
    </HeaderWrapper>
  );
};

export default Header;
