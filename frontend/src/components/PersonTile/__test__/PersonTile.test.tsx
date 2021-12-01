import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "styles/global.styles";
import theme from "styles/theme";
import PersonTile from "..";

const renderPersonTile = (
  name: string,
  gender: "male" | "female",
  birthDate: string,
  image?: string
) => {
  render(
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <PersonTile
          name={name}
          gender={gender}
          birthDate={birthDate}
          imgUrl={image}
          node=""
          id=""
          style={{}}
          onSubClick={() => {}}
        />
      </ThemeProvider>
    </>
  );
  const tile = screen.queryByText(name)?.closest("button");
  const birthDiv = screen.queryByText(birthDate);
  const addButton = screen.queryByTestId("add-person-button");
  const img = screen.queryByRole("img");

  return { tile, addButton, img, birthDiv };
};

const mockData: [string, "male" | "female", string] = [
  "John Williams",
  "male",
  "16.10.1998",
];

describe("Person tile", () => {
  it("renders as a button", () => {
    const { tile } = renderPersonTile(...mockData);
    expect(tile).toBeInTheDocument();
  });

  it("has add person button", () => {
    const { addButton } = renderPersonTile(...mockData);
    expect(addButton).toBeInTheDocument();
  });

  it("has birth date", () => {
    const { birthDiv } = renderPersonTile(...mockData);
    expect(birthDiv).toBeInTheDocument();
  });

  it("has no image if no url was passed", () => {
    const { img } = renderPersonTile(...mockData);
    expect(img).not.toBeInTheDocument();
  });

  it("has image if url was passed", () => {
    const { img } = renderPersonTile(
      ...mockData,
      "https://www.national-geographic.pl/media/cache/slider_big/uploads/media/default/0014/35/panda-1_1334159.webp"
    );
    expect(img).toBeInTheDocument();
  });
});
