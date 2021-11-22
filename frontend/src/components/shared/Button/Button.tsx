import styled from "styled-components";
import { centeredDiv } from "styles/mixins";

const Button = styled.button`
  ${centeredDiv}

  color: ${({ theme }) => theme.colors.button.textColor};
  font-size: ${({ theme }) => theme.fonts.sizes.base};

  background-color: ${({ theme }) => theme.colors.button.bg};

  padding: 0 34px;
  margin-top: 45px;
  min-height: 48px;

  border-radius: 15px;

  position: relative;
  overflow: hidden;
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

    background-color: ${({ theme }) => theme.colors.button.hoveredBg};
  }

  &:hover::after,
  &:focus::after {
    transform-origin: 50% 100%;
    transform: scaleY(100%);
  }
`;

export default Button;
