import styled from "styled-components";
import { columnDiv } from "styles/mixins";

export const MainWrapper = styled.main`
  width: 100vw;
  height: calc(100vh - ${({ theme }) => theme.heights.header});

  padding: 38px;

  ${columnDiv}
  justify-content: center;
`;
