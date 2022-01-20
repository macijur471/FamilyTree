import styled from "styled-components";
import { centeredDiv, columnDiv, darkBgScroll } from "styles/mixins";
import { ThemeType } from "styles/theme";

export const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  ${centeredDiv}

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  padding: 112px 0;
`;

export const ModalInnerWrapper = styled.div<{
  bg: keyof ThemeType["colors"]["modal"]["bg"];
  column?: boolean;
  small?: boolean;
}>`
  ${({ column }) => column && columnDiv}

  -webkit-box-shadow: 0px 0px 150px 150px rgba(42, 50, 75, 1);
  -moz-box-shadow: 0px 0px 150px 150px rgba(42, 50, 75, 1);
  box-shadow: 0px 0px 150px 150px rgba(42, 50, 75, 1);

  position: relative;

  width: 700px;
  height: ${({ small }) => !small && "100%"};

  padding: 50px;

  background-color: ${({ theme, bg }) => theme.colors.modal.bg[bg]};

  border-radius: 20px;
  border-top-right-radius: 0;

  overflow-y: scroll;
  ${darkBgScroll}
`;

export const ModalCloseButton = styled.button<{
  bg: keyof ThemeType["colors"]["modal"]["bg"];
}>`
  background-color: ${({ theme, bg }) => theme.colors.modal.bg[bg]};

  position: absolute;
  top: 20px;
  right: 20px;

  &:hover svg,
  &:focus svg {
    transform: scale(1.2);
  }

  svg {
    transition: transform 0.2s ease-out;
  }
`;
