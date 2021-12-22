import styled from "styled-components";
import { spaceBetweenDiv } from "styles/mixins";

export const ImagesListWrapper = styled.div`
  ${spaceBetweenDiv}
  width:100%;

  flex-wrap: wrap;
`;

export const ImagesListImg = styled.img`
  width: 80px;
  height: 80px;
`;
