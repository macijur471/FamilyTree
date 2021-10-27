import styled from "styled-components";
import { columnDiv } from "styles/mixins";

export const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;

  ${columnDiv}

  background-color: ${({ theme }) => theme.colors.bg};
`;
