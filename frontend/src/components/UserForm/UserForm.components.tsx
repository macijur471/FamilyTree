import styled, { css } from "styled-components";
import { centeredLeftDiv, columnDiv } from "styles/mixins";

export const UserFormWrapper = styled.div`
  ${columnDiv};

  color: ${({ theme }) => theme.colors.loginForm.mainColor};

  width: 535px;

  overflow-y: hidden;
`;

export const UserFormBttns = styled.div`
  ${centeredLeftDiv}

  width: 100%;
`;

export const UserFormButton = styled.button<{ isActive: boolean }>`
  padding: 12px 44px;

  background-color: ${({ isActive, theme }) =>
    isActive
      ? theme.colors.loginForm.bg
      : theme.colors.loginForm.inactiveButtonBg};

  &:not(:first-child) {
    margin-left: 7px;
  }

  border-top-left-radius: 9px;
  border-top-right-radius: 9px;

  font-size: ${({ theme }) => theme.fonts.sizes.base};
  color: ${({ theme }) => theme.colors.loginForm.mainColor};

  overflow: hidden;
  position: relative;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;

    height: 100%;
    width: 100%;

    transform: scaleY(0);
    transform-origin: 50% 0%;
    transition: transform 0.2s ease-out;

    background-color: ${({ theme }) => theme.colors.loginForm.hoveredButtonBg};
  }

  &:hover::after,
  &:focus::after {
    ${({ isActive }) =>
      !isActive &&
      css`
        transform-origin: 50% 100%;
        transform: scaleY(100%);
      `}
  }
`;

export const MainFormWrapper = styled.div`
  ${columnDiv}
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.loginForm.bg};

  padding: 56px 0;

  overflow-y: hidden;
`;

export const MainFormInside = styled.form`
  ${columnDiv}

  width:100%;
  height: 100%;
  padding: 0 56px;

  overflow-y: auto;

  @-moz-document url-prefix() {
    /* Disable scrollbar Firefox */
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.loginForm.scrollbarThumb}
      ${({ theme }) => theme.colors.loginForm.bg};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.loginForm.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.loginForm.scrollbarThumb};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.loginForm.scrollbarThumbActive};
  }
`;
