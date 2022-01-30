import styled from "styled-components";
import { WrapperWithBgBar } from "components/shared/WrapperWithBgBar/WrapperWithBgBar";
import { centeredDiv, columnDiv } from "styles/mixins";
import { ThemeType } from "styles/theme";

export const PersonInfoModalHeaderWrapper = styled(WrapperWithBgBar)`
  width: 100%;

  ${centeredDiv}
`;

export const PersonInfoModalHeaderText = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-family: ${({ theme }) => theme.fonts.families.fancy};
  color: ${({ theme }) => theme.colors.text.dark};

  position: relative;
  z-index: 2;
`;

export const PersonDatesWrapper = styled.div`
width: 100%;

${centeredDiv}
`;

export const PersonInfoImgWrapper = styled.div`
  border-radius: 10px;

  background-color: #c4c4c4;

  height: 80px;
  width: 80px;

  margin-top: auto;

  overflow: hidden;
`;

export const PersonInfoImage = styled.img`
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
