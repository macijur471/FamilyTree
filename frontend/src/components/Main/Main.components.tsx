import styled from "styled-components";
import { columnDiv } from "styles/mixins";

export const MainWrapper = styled.main`
  width: 100vw;
  height: calc(100vh - ${({ theme }) => theme.heights.header});

  ${columnDiv}
  justify-content: center;

  overflow: auto;
`;
