import styled from "styled-components";
import { columnDiv, spaceBetweenDiv } from "styles/mixins";

export const HobbiesListWrapper = styled.div`
  ${columnDiv}

  width: 100%;

  label {
    margin-right: auto;
  }

  input {
    margin-top: 0;
  }

  button {
    margin-top: 17px;
  }
`;

export const HobbyItemWrapper = styled.div`
  ${spaceBetweenDiv}
  align-items: flex-start;

  width: 100%;

  margin-top: 40px;

  &:first-of-type {
    margin-top: 9px;
  }

  & > *:first-child {
    width: 358px;
  }
`;
