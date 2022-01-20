import React, { FunctionComponent } from "react";
import { ThemeType } from "styles/theme";
import {
  ModalCloseButton,
  ModalInnerWrapper,
  ModalWrapper,
} from "./Modal.components";
import { ReactComponent as CloseIcon } from "images/close.svg";

interface Props {
  bgColor?: keyof ThemeType["colors"]["modal"]["bg"];
  close?: () => void | Promise<void>;
  column?: boolean;
  small?: boolean;
}

const Modal: FunctionComponent<Props> = ({
  bgColor = "default",
  close,
  children,
  column,
  small,
}) => {
  return (
    <ModalWrapper data-cy="modal" data-testid="modal">
      <ModalInnerWrapper bg={bgColor} column={column} small={small}>
        <ModalCloseButton
          bg={bgColor}
          onClick={(e) => {
            e.preventDefault();
            if (close) close();
          }}
        >
          <CloseIcon />
        </ModalCloseButton>
        {children}
      </ModalInnerWrapper>
    </ModalWrapper>
  );
};

export default Modal;
