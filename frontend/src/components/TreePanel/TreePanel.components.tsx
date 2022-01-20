import { IconButtonWrapper } from "components/shared/IconButton/IconButton.components";
import styled from "styled-components";
import { centeredTopDiv, columnDiv, darkBgScroll } from "styles/mixins";

export const TreePanelWrapper = styled.div`
  height: 100%;
  width: 100%;

  ${columnDiv}

  padding:0 ${({ theme }) => theme.paddings.treeWrapper};

  position: relative;

  & > ${IconButtonWrapper} {
    width: 60px;
    height: 60px;

    position: absolute;
    top: 30px;
    left: 30px;
  }
`;

export const TreeWrapper = styled.div`
  width: 100%;
  height: calc(100% - ${({ theme }) => theme.heights.treeButtons});

  ${centeredTopDiv}

  overflow: auto;

  ${darkBgScroll}
`;
