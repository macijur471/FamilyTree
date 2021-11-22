import styled from "styled-components";
import { centeredDiv, centeredLeftDiv } from "styles/mixins";
import { ReactComponent as Tick } from "images/tick.svg";

export const PrivacyPolicyCheckboxWrapper = styled.div`
  ${centeredLeftDiv}
  width: 100%;

  margin-top: 28px;
`;

export const StyledTick = styled(Tick)`
  height: 80%;
  width: 80%;

  position: absolute;
  z-index: 1;

  visibility: hidden;
`;

export const PrivacyPolicyCheckboxElement = styled.div`
  ${centeredDiv}

  height: 20px;
  width: 20px;

  position: relative;
`;

export const PrivacyPolicyCheckboxInput = styled.input`
  height: 100%;
  width: 100%;

  margin: 0;

  position: absolute;
  z-index: 4;

  opacity: 0;

  cursor: pointer;

  &:checked + ${StyledTick} {
    visibility: visible;
  }
`;

export const PrivacyPolicyCheckboxFakeInput = styled.div<{ isError?: boolean }>`
  height: 100%;
  width: 100%;

  position: absolute;
  z-index: 1;

  background-color: ${({ theme, isError }) =>
    isError ? theme.colors.errorRed : theme.colors.input.underlineColor};
  border-radius: 5px;
`;

export const PrivacyPolicyText = styled.div`
  color: ${({ theme }) => theme.colors.text.dark};
  font-size: ${({ theme }) => theme.fonts.sizes.s};

  margin-left: 20px;
`;

export const PrivacyPolicyTrigger = styled.span`
  color: ${({ theme }) => theme.colors.text.highlited};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
