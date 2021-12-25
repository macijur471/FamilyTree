import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "styles/global.styles";
import theme from "styles/theme";
import ImagesList from "..";

const renderImagesList = (imgs?: string[]) => {
  render(
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <ImagesList images={imgs} />
      </ThemeProvider>
    </>
  );
  const images = screen.queryAllByRole("img");

  return { images };
};

describe("Images List component", () => {
  it("doesn't display images when no prop is passed", () => {
    const { images } = renderImagesList();
    expect(images).toHaveLength(0);
  });

  it("displays 3 images when prop of 3 strings is passed", () => {
    const { images } = renderImagesList(["", "", ""]);
    expect(images).toHaveLength(3);
  });
});
