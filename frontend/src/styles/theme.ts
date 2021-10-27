const theme = {
  fonts: {
    families: {
      normal: "'Montserrat', sans-serif",
      fancy: "'Pacifico', cursive",
    },
    sizes: {
      s: "14px",
      base: "18px",
      m: "20px",
      l: "22px",
      xl: "24px",
      xxl: "36px",
    },
  },
  colors: {
    bg: "var(--dark-purple)",
    text: {
      error: "var(--black)",
      dark: "var(--dark-blue)",
      light: "var(--white)",
      placeholder: "var(--med-blue)",
    },
  },
};

export default theme;

export type ThemeType = typeof theme;
