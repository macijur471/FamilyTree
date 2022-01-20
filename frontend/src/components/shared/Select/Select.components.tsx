import styled from "styled-components";

export const SelectWrapper = styled.div`
  position: relative;
`;

export const SelectElement = styled.select`
  width: 100%;

  padding: 26px 24px;
  margin-top: 8px;

  background-color: ${({ theme }) => theme.colors.input.bg};

  color: ${({ theme }) => theme.colors.input.textColor};
  font-size: ${({ theme }) => theme.fonts.sizes.base};
  font-family: ${({ theme }) => theme.fonts.families.normal};

  border-radius: 15px;
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.input.placeholderColor};
  }

  &:focus + div::after {
    transform: scaleX(1);
  }
`;

export const SelectUnderline = styled.div<{ themeColor: "light" | "dark" }>`
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

    background-color: ${({ theme, themeColor }) =>
      theme.colors.input[themeColor].underlineActiveColor};

    transform: scaleX(0);
    transform-origin: 0% 50%;
    transition: transform 0.3s ease-out;
  }
`;

export const SelectOption = styled.option`
  padding: 10px 20px;
`;
