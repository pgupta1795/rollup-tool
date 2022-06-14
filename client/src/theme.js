import { createTheme } from "@mui/material/styles";

const TechniaColor = "#37ABC3";

const primary = {
  light: "#73ddf6",
  main: TechniaColor,
  dark: "#007c93",
  contrastText: "#fff",
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: primary,
    alternateTextColor: TechniaColor,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: primary,
    alternateTextColor: TechniaColor,
  },
});
