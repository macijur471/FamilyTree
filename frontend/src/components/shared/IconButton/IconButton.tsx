import React, { FunctionComponent } from "react";
import { ThemeType } from "styles/theme";
import { IconButtonWrapper } from "./IconButton.components";

interface Props {
  icon: JSX.Element;
  color: keyof ThemeType["colors"]["iconButton"]["theme"];
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
}

const IconButton: FunctionComponent<Props> = ({
  icon,
  color,
  onClick,
  disabled = false,
}) => {
  return (
    <IconButtonWrapper
      onClick={onClick}
      color={color}
      data-testid="icon-button"
      type="button"
      disabled={disabled}
    >
      {icon}
    </IconButtonWrapper>
  );
};

export default IconButton;
