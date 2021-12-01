import React, { FunctionComponent } from "react";
import { ThemeType } from "styles/theme";
import { IconButtonWrapper } from "./IconButton.components";

interface Props {
  icon: JSX.Element;
  color: keyof ThemeType["colors"]["iconButton"]["theme"];
  onClick?: () => void | Promise<void>;
}

const IconButton: FunctionComponent<Props> = ({ icon, color, onClick }) => {
  return (
    <IconButtonWrapper
      onClick={onClick}
      color={color}
      data-testid="add-person-button"
    >
      {icon}
    </IconButtonWrapper>
  );
};

export default IconButton;
