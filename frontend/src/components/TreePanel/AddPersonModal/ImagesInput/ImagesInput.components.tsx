import styled from "styled-components";
import { centeredDiv, columnDiv } from "styles/mixins";

export const ImagesInputWrapper = styled.div`
  ${columnDiv}
  align-items:flex-start;

  width: 100%;
`;

export const ImagesInputElement = styled.input`
  width: 100%;
  height: 100%;

  opacity: 0;

  position: relative;
  z-index: 2;

  cursor: pointer;

  border-radius: 15px;

  &:focus + div::after,
  &:hover + div::after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
`;

export const ImagesInputElementWrapper = styled.div`
  position: relative;

  width: 185px;
  height: 41px;

  margin: 30px 0;
`;

export const FakeImagesInputElement = styled.div`
  ${centeredDiv}

  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  border-radius: 15px;
  z-index: 1;

  background-color: ${({ theme }) => theme.colors.addPersonModal.imagesInputBg};

  overflow: hidden;

  cursor: pointer;

  &::after {
    content: "";
    width: 100%;
    height: 100%;

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    background-color: ${({ theme }) =>
      theme.colors.addPersonModal.imagesInputBgHover};

    transform: scaleX(0);
    transition: transform 0.3s ease-out;
    transform-origin: 100% 50%;
  }
`;
