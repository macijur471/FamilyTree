import styled from "styled-components";
import { spaceBetweenDiv } from "styles/mixins";

export const TreePanelButtonsWrapper = styled.div`
  height: ${({ theme }) => theme.heights.treeButtons};
  width: 220px;

  ${spaceBetweenDiv}
`;
