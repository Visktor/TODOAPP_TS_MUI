import { Box, ThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo } from "react";
import useToggle from "../hooks/Toggle";
import { darkTheme } from "../themes/dark";
import { lightTheme } from "../themes/light";

interface IthemeContextData {
  isThemeDark: boolean;
  toggleDarkTheme: () => void;
}

const MuiThemeContext = createContext({} as IthemeContextData);

export const useMuiThemeContext = () => {
  return useContext(MuiThemeContext);
};

export const MuiThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isThemeDark, toggleDarkTheme] = useToggle();

  const theme = useMemo(() => {
    if (isThemeDark) {
      return darkTheme;
    }

    return lightTheme;
  }, [isThemeDark]);

  return (
    <MuiThemeContext.Provider value={{ isThemeDark, toggleDarkTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          bgcolor={theme.palette.background.default}
          height="100vh"
          width="100vw"
        >
          {children}
        </Box>
      </ThemeProvider>
    </MuiThemeContext.Provider>
  );
};
