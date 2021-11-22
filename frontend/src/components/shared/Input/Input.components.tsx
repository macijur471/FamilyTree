import styled from "styled-components";
import { columnDiv } from "styles/mixins";

export const InputWrapper = styled.div`
  ${columnDiv}

  align-items: flex-start;

  width: 100%;

  &:not(:first-child) {
    margin-top: 28px;
  }
`;

export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-family: ${({ theme }) => theme.fonts.families.fancy};

  cursor: pointer;
`;

export const InputElement = styled.input`
  width: 100%;

  padding: 26px 24px;
  margin-top: 8px;

  background-color: ${({ theme }) => theme.colors.input.bg};

  color: ${({ theme }) => theme.colors.input.textColor};
  font-size: ${({ theme }) => theme.fonts.sizes.base};

  border-radius: 15px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.input.placeholderColor};
  }

  &:focus + div::after {
    transform: scaleX(1);
  }
`;

export const InputUnderline = styled.div`
  width: 100%;
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

    background-color: ${({ theme }) => theme.colors.input.underlineActiveColor};

    transform: scaleX(0);
    transform-origin: 0% 50%;
    transition: transform 0.3s ease-out;
  }
`;

export const InputError = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.s};

  margin-top: 8px;

  height: 18px;
`;
