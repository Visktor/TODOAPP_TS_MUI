import { createTheme } from "@mui/material";
import { red, yellow } from "@mui/material/colors";

export const darkTheme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: red["300"],
      dark: red["500"],
      light: red["A200"],
      contrastText: "#ffffff",
    },
    secondary: {
      main: yellow[400],
      dark: yellow[600],
      contrastText: "#ffffff",
    },
    background: {
      default: "#282828",
      paper: "#343434",
    },
  },
});
