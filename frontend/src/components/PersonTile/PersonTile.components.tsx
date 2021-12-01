import styled from "styled-components";
import { centeredDiv } from "styles/mixins";

export const PersonTileWrapper = styled.div`
  position: absolute;

  ${centeredDiv}
`;

export const PersonTileBirthDate = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  font-family: ${({ theme }) => theme.fonts.families.fancy};
  color: ${({ theme }) => theme.colors.text.dark};
`;

export const PersonTileImgWrapper = styled.div`
  border-radius: 10px;

  background-color: #c4c4c4;

  height: 80px;
  width: 80px;

  margin-top: auto;

  overflow: hidden;
`;

export const PersonTileImage = styled.img`
  height: 80px;
  width: auto;
`;

export const PersonTileAddButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 3;
`;

export const PersonTileSubtreeBttn = styled.button`
  ${centeredDiv}

  width: 54px;
  height: 21px;

  position: absolute;
  top: 20px;
  right: 45px;
  z-index: 3;

  border-radius: 5px 5px 0 0;
  background-color: ${({ theme }) => theme.colors.personTile.subtreeBg};
`;
