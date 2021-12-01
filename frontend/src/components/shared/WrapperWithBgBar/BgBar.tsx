import styled, { css } from "styled-components";
import { ThemeType } from "styles/theme";

interface Props {
  width?: number;
  color: keyof ThemeType["colors"]["bgbar"];
  top?: number;
}

const BgBar = styled.div<Props>`
  height: 10px;
  width: ${({ width }) => (width ? `${width}px` : "100%")};

  background-color: ${({ theme, color }) => theme.colors.bgbar[color]};

  top: calc(50% - 6px);
  position: absolute;
  ${({ top }) =>
    top &&
    css`
      top: ${top}%;
    `}
`;

export default BgBar;
