import styled from "styled-components";
import { WrapperWithBgBar } from "components/shared/WrapperWithBgBar/WrapperWithBgBar";
import { centeredDiv, columnDiv, spaceBetweenDiv } from "styles/mixins";

export const AddModalHeaderWrapper = styled(WrapperWithBgBar)`
  width: 100%;

  ${centeredDiv}
`;

export const AddModalHeaderText = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-family: ${({ theme }) => theme.fonts.families.fancy};
  color: ${({ theme }) => theme.colors.text.dark};

  position: relative;
  z-index: 2;
`;

export const AddPersonForm = styled.form`
  ${columnDiv}

  width: 423px;

  margin-top: 70px;

  & > *:not(:first-child) {
    margin-top: 50px !important;
  }
`;

export const AddPersonInputRow = styled.div`
  ${spaceBetweenDiv}

  width:100%;

  & > * {
    width: 196px !important;
    margin-top: 0 !important;
  }
`;
