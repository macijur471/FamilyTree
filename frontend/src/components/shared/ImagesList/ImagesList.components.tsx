import styled from "styled-components";
import { centeredLeftDiv } from "styles/mixins";

export const ImagesListWrapper = styled.div`
  ${centeredLeftDiv}
  width:100%;

  flex-wrap: wrap;
`;

export const ImagesListImg = styled.img`
  width: 80px;
  height: 80px;

  &:not(:nth-child(4n + 1)) {
    margin-left: 34px;
  }
  &:not(:nth-child(-n + 4)) {
    margin-top: 34px;
  }
`;
