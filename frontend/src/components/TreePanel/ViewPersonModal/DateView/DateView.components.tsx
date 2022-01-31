import styled from "styled-components";
import { centeredDiv, columnDiv } from "styles/mixins";
import { ThemeType } from "styles/theme";

export const DateViewWrapper = styled.div<{
  bg: keyof ThemeType["colors"]["modal"]["bgDark"];
}>`
  ${columnDiv}

  width:  200px;
  height: 125px;

  background-color: ${({ bg, theme }) => theme.colors.modal.bgDark[bg]};

  border-radius: 15px 15px 15px 15px;

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

    transform: scale(0);
    transition: transform 0.3s ease-out;
  }

  &:hover::after,
  &:focus::after {
    transform: scale(1);
  }
`;

export const DataViewHeaderText = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-family: ${({ theme }) => theme.fonts.families.fancy};
  color: ${({ theme }) => theme.colors.text.light};

  margin-top: 15px;
  position: realtive;
  z-index: 2;
`;

export const HeaderUnderline = styled.div`
  width: 80%;
  height: ${({ theme }) => theme.borders.thin};

  background-color: ${({ theme }) => theme.colors.text.light};

  position: relative;
  top: 5px;

`;

export const DateText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.l};
  font-family: ${({ theme }) => theme.fonts.families.fancy};
  color: ${({ theme }) => theme.colors.text.light};

  margin-top: 10px
`;