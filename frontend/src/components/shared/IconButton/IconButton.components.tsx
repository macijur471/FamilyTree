import styled from "styled-components";
import { centeredDiv } from "styles/mixins";
import { ThemeType } from "styles/theme";

export const IconButtonWrapper = styled.button<{
  color: keyof ThemeType["colors"]["iconButton"]["theme"];
  big?: boolean;
}>`
  ${centeredDiv}

  background-color: ${({ theme, color }) =>
    theme.colors.iconButton.theme[color].bg};

  width: ${({ big }) => (big ? "60px" : "40px")};
  height: ${({ big }) => (big ? "60px" : "40px")};

  border-radius: 50%;

  svg {
    transition: transform 0.2s ease-out;
    fill: ${({ theme, color }) => theme.colors.iconButton.theme[color].fill};
  }

  position: relative;
  z-index: 1;

  &::after {
    content: "";
    height: 100%;
    width: 100%;

    border-radius: 50%;

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    background-color: ${({ color, theme }) =>
      theme.colors.iconButton.theme[color].hoveredBg};

    transform: scale(0);
    transition: transform 0.2s ease-out;
  }

  &:not(:disabled):hover::after,
  &:not(:disabled):focus::after {
    transform: scale(1);
  }

  &:hover svg,
  &:focus svg {
    transform: scale(0.8);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.iconButton.disabledBg};

    svg {
      fill: ${({ theme }) => theme.colors.iconButton.disabledFill};
    }
  }
`;
