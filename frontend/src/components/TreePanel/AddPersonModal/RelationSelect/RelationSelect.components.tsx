import styled from "styled-components";
import { columnDiv } from "styles/mixins";

export const RelationSelectWrapper = styled.div`
  ${columnDiv}
  align-items: flex-start;

  width: 100%;
`;

export const RelationDescription = styled.div`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.fonts.sizes.base};

  margin: 9px 0 30px;
`;
