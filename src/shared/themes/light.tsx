import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const lightTheme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: red[500],
    },
  },
});
