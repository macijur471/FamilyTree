import styled from "styled-components";

export const LoaderWrapper = styled.div`
  height: 50px;
  width: 270px;

  background-color: ${({ theme }) => theme.colors.bg};

  svg {
    width: 100%;
    height: auto;
  }
`;
