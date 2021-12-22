import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "styles/global.styles";
import theme from "styles/theme";
import Select from "..";

const renderSelect = (opts?: string[]) => {
  render(
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Select options={opts || []} />
      </ThemeProvider>
    </>
  );
  const select = screen.queryByRole("combobox");
  const options = screen.queryAllByRole("option");

  return { select, options };
};

describe("Select component", () => {
  it("displays passed options (none)", () => {
    const { select, options } = renderSelect();
    expect(select).toBeInTheDocument();
    expect(options?.length).toBe(0);
  });

  it("displays passed options (3)", () => {
    const { select, options } = renderSelect(["a", "b", "c"]);
    expect(select).toBeInTheDocument();
    expect(options?.length).toEqual(3);
  });
});
