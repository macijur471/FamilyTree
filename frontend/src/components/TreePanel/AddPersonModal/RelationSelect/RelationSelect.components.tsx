import styled from "styled-components";
import { centeredDiv, columnDiv, spaceBetweenDiv } from "styles/mixins";
import { SelectWrapper } from "components/shared/Select/Select.components";

export const RelationSelectWrapper = styled.div`
  ${columnDiv}

  width: 100%;
`;

export const RelationSelectRow = styled.div`
  ${spaceBetweenDiv}

  width:100%;

  margin: 20px 0;

  ${SelectWrapper} {
    width: 150px;
  }

  select {
    font-size: ${({ theme }) => theme.fonts.sizes.s};
  }
`;

export const RelationSelectIsTile = styled.div`
  ${centeredDiv}

  height:32px;
  width: 32px;

  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.input.underlineColor};
  color: ${({ theme }) => theme.colors.text.light};
`;
