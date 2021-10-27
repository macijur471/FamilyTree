import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "styles/global.styles";
import theme from "styles/theme";
import { AppWrapper } from "./App.components";

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <AppWrapper>hello</AppWrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
