import styled from "styled-components";
import { columnDiv } from "styles/mixins";
import { ThemeType } from "styles/theme";

export const InfoViewWrapper = styled.div<{
  bg: keyof ThemeType["colors"]["modal"]["bgDark"];
}>`
  ${columnDiv}

  margin-top: 40px;
  width:  100%;

  background-color: ${({ bg, theme }) => theme.colors.modal.bgDark[bg]};

  border-radius: 20px 20px 20px 20px;

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

export const InfoLine = styled.div`
  
`;

export const LeftPrinter = styled.div`
  
`;

export const RightPrinter = styled.div`
  
`;

export const HobbiesListWrapper = styled.ul`
  
`;

export const HobbiesListItemize = styled.li`
  
`;