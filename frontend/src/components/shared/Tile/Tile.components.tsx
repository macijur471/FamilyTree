import styled, { css } from "styled-components";
import { centeredDiv, columnDiv } from "styles/mixins";
import { ThemeType } from "styles/theme";
import { WrapperWithBgBar } from "../WrapperWithBgBar/WrapperWithBgBar";

export const TileWrapper = styled.div<{
  bg: keyof ThemeType["colors"]["personTile"]["bg"];
}>`
  ${columnDiv}

  width: ${({ bg }) => (bg === "add" ? "280px" : "206px")};
  height: ${({ bg }) => (bg === "add" ? "125px" : "191px")};

  padding: 20px;
  ${({ bg }) =>
    bg === "add" &&
    css`
      margin: auto 0;
    `}

  background-color: ${({ bg, theme }) => theme.colors.personTile.bg[bg]};

  border-top-left-radius: 15px;

  cursor: pointer;

  position: relative;
  z-index: 1;
  overflow: hidden;

  &::after {
    content: "";
    height: 150%;
    width: 150%;

    border-radius: 50%;

    position: absolute;
    z-index: -1;
    top: -25%;
    left: -25%;

    background-color: ${({ bg, theme }) => theme.colors.personTile.hoverBg[bg]};

    transform: scale(0);
    transition: transform 0.3s ease-out;
  }

  &:hover::after,
  &:focus::after {
    transform: scale(1);
  }
`;

export const TileTextWrapper = styled(WrapperWithBgBar)`
  width: 100%;

  ${centeredDiv}
`;

export const TileText = styled.span`
  position: relative;
  z-index: 1;

  font-size: ${({ theme }) => theme.fonts.sizes.base};
  font-family: ${({ theme }) => theme.fonts.families.fancy};
  color: ${({ theme }) => theme.colors.text.dark};
`;
