import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, IconButton, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideBar } from "../../shared/components/sidebar/SideBar";
import { useMuiThemeContext } from "../../shared/contexts/ThemeContext";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export const Layout = ({}) => {
  const { isThemeDark, toggleDarkTheme } = useMuiThemeContext();
  const muiTheme = useTheme();
  const drawerWidth = "240px";

  return (
    <Grid container>
      <Box width={drawerWidth}>
        <SideBar drawerWidth={drawerWidth} />
      </Box>

      <Grid container item xs={true} mx={muiTheme.spacing(2)}>
        <Box
          width="100%"
          display="flex"
          justifyContent="end"
          mr={muiTheme.spacing(1)}
        >
          <IconButton
            onClick={() => {
              toggleDarkTheme();
            }}
          >
            <FontAwesomeIcon
              icon={isThemeDark ? faSun : faMoon}
            ></FontAwesomeIcon>
          </IconButton>
        </Box>
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
};
