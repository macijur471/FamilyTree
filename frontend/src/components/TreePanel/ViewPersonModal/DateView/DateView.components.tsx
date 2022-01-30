import styled from "styled-components";
import { centeredDiv, columnDiv } from "styles/mixins";
import { ThemeType } from "styles/theme";

export const DateViewWrapper = styled.div<{
  bg: keyof ThemeType["colors"]["modal"]["bgDark"];
}>`
  ${columnDiv}

  width: ${({ bg }) => (bg === "male" ? "280px" : "206px")};
  height: ${({ bg }) => (bg === "male" ? "125px" : "191px")};

  background-color: ${({ bg, theme }) => theme.colors.modal.bgDark[bg]};

  border-top-left-radius: 15px;

  cursor: pointer;

  position: relative;
  z-index: 1;
  overflow: hidden;

  &:focus::after {
    transform: scale(1);
  }
`;

export const DataViewHeaderText = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-family: ${({ theme }) => theme.fonts.families.fancy};
  color: ${({ theme }) => theme.colors.text.dark};

  position: relative;
  z-index: 2;
`;

export const HeaderUnderline = styled.div<{ themeColor: "light" }>`
  width: 80%;
  height: ${({ theme }) => theme.borders.thick};

  background-color: ${({ theme }) => theme.colors.input.underlineColor};

  position: relative;
  bottom: 4px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;


  }
`;

export const DateText = styled.div`
width: 423px;

margin-top: 30px;

`;