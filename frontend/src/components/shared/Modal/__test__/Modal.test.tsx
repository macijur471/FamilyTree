import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "styles/global.styles";
import theme from "styles/theme";
import Modal from "components/shared/Modal";

const renderModal = (children?: React.ReactNode) => {
  const { getByText } = render(
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Modal>{children}</Modal>
      </ThemeProvider>
    </>
  );
  const modal = screen.getByTestId("modal");
  const button = screen.getByRole("button");

  return { modal, button, getChildByText: getByText };
};

describe("Modal component", () => {
  it("has close button", () => {
    const { button } = renderModal();
    expect(button).toBeInTheDocument();
  });

  it("displays children properly", () => {
    const { getChildByText } = renderModal(
      <>
        <h1>Heading</h1>
        <p>Test paragraph</p>
      </>
    );

    expect(getChildByText(/test paragraph/i)).toBeInTheDocument();
    expect(getChildByText(/heading/i)).toBeInTheDocument();
  });
});
