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
    errorRed: "var(--dark-red)",
    text: {
      error: "var(--black)",
      dark: "var(--dark-blue)",
      light: "var(--white)",
      placeholder: "var(--med-blue)",
      highlited: "var(--dark-turqoise)",
    },
    bgbar: {
      dark: "var(--med-blue)",
      light: "var(--yellow)",
    },
    loginForm: {
      bg: "var(--orange)",
      inactiveButtonBg: "var(--red)",
      hoveredButtonBg: "var(--dark-red)",
      mainColor: "var(--dark-blue)",
      scrollbarThumb: "var(--med-blue)",
      scrollbarThumbActive: "var(--light-blue)",
    },
    input: {
      bg: "#FFFFFF",
      underlineColor: "var(--med-blue)",
      underlineActiveColor: "var(--red)",
      placeholderColor: "var(--med-blue)",
      textColor: "var(--almost-black)",
    },
    button: {
      textColor: "#FFFFFF",
      bg: "var(--red)",
      hoveredBg: "var(--dark-red)",
    },
    modal: {
      bg: {
        male: "var(--turqoise)",
        female: "var(--red)",
        default: "var(--med-blue)",
      },
    },
    personTile: {
      bg: {
        male: "var(--turqoise)",
        female: "var(--red)",
        add: "var(--light-blue)",
      },
      hoverBg: {
        male: "var(--dark-turqoise)",
        female: "var(--dark-red)",
        add: "var(--med-blue)",
      },
      subtreeBg: "var(--yellow)",
    },
    iconButton: {
      disabledBg: "#C4C4C4",
      disabledFill: "var(--dark-blue)",
      theme: {
        green: {
          bg: "var(--lime)",
          hoveredBg: "var(--dark-lime)",
          fill: "var(--dark-blue)",
        },
        red: {
          bg: "var(--dark-red)",
          hoveredBg: "var(--v-dark-red)",
          fill: "var(--orange)",
        },
        blue: {
          bg: "var(--light-blue)",
          hoveredBg: "var(--med-blue)",
          fill: "var(--orange)",
        },
        orange: {
          bg: "var(--orange)",
          hoveredBg: "var(--dark-orange)",
          fill: "var(--dark-blue)",
        },
      },
    },
  },
  heights: {
    header: "var(--header-height)",
  },
  borders: { thick: "8px", thin: "4px" },
};

export default theme;

export type ThemeType = typeof theme;
