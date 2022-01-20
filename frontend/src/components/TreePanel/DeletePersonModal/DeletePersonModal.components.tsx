import styled from "styled-components";
import { spaceBetweenDiv } from "styles/mixins";

export const DeletePersonModalText = styled.div`
  width: 100%;

  font-size: ${({ theme }) => theme.fonts.sizes.m};
`;

export const DeletePersonButtonsWrapper = styled.div`
  width: 50%;

  ${spaceBetweenDiv}

  margin-top:30px;
`;
