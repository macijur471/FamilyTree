import { css } from "styled-components";

export const columnDiv = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const centeredDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const centeredTopDiv = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const centeredLeftDiv = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const spaceBetweenDiv = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const darkBgScroll = css`
  @-moz-document url-prefix() {
    /* scrollbar Firefox */
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.tree.scrollbarThumb}
      ${({ theme }) => theme.colors.tree.scrollbarTrack};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.tree.scrollbarTrack};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.tree.scrollbarThumb};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.tree.scrollbarThumbActive};
  }
`;
