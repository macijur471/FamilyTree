import { render, screen } from "@testing-library/react";
import Input from "components/shared/Input";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "styles/global.styles";
import theme from "styles/theme";

const renderInput = (label = "Email", errorMssg = "", noLabel = false) => {
  render(
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Input label={label} errorMssg={errorMssg} noLabel={noLabel} />
      </ThemeProvider>
    </>
  );
  const input = screen.getByRole("textbox");
  const labelElement = input.previousElementSibling;
  const error = screen.getByTestId(/input-error/i);

  return { input, error, label: labelElement };
};

describe("Input component", () => {
  it("has input element", () => {
    const { input } = renderInput();
    expect(input).toBeInTheDocument();
  });

  it("has label element", () => {
    const { label } = renderInput();
    expect(label).toBeInTheDocument();
  });

  it("has empty error message field", () => {
    const { error } = renderInput();
    expect(error).toBeInTheDocument();
    expect(error).not.toHaveTextContent(/^.{1,}$/);
  });

  it("has proper placeholder", () => {
    const { input } = renderInput("My label");
    expect(input).toHaveAttribute(
      "placeholder",
      expect.stringMatching(/^my label...$/i)
    );
  });

  it("displays error message", () => {
    const { error } = renderInput("Email", "This is an error mssg");
    expect(error).toHaveTextContent(/^this is an error mssg$/i);
  });

  it("has no label element when a prop is passed", () => {
    const { label } = renderInput("Email", "", true);
    expect(label).not.toBeInTheDocument();
  });
});
