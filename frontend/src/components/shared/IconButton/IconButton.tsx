import React, { FunctionComponent } from "react";
import { ThemeType } from "styles/theme";
import { IconButtonWrapper } from "./IconButton.components";

interface Props {
  icon: JSX.Element;
  color: keyof ThemeType["colors"]["iconButton"]["theme"];
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  optRef?: React.Ref<HTMLButtonElement>;
}

const IconButton: FunctionComponent<Props> = ({
  icon,
  color,
  onClick,
  optRef,
  disabled = false,
}) => {
  return (
    <IconButtonWrapper
      onClick={onClick}
      color={color}
      data-testid="icon-button"
      type="button"
      disabled={disabled}
      ref={optRef}
    >
      {icon}
    </IconButtonWrapper>
  );
};

export default IconButton;
