import styled, { css } from "styled-components";
import { ThemeType } from "styles/theme";

interface Props {
  width: number;
  color: keyof ThemeType["colors"]["bgbar"];
  top?: number;
}

const BgBar = styled.div<Props>`
  height: 10px;
  width: ${({ width }) => `${width}px`};

  background-color: ${({ theme, color }) => theme.colors.bgbar[color]};

  position: absolute;
  ${({ top }) =>
    top &&
    css`
      top: ${top}%;
    `}
`;

export default BgBar;
