import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  faPerson,
  faCalendar,
  faGear,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const SideBar = ({ drawerWidth }: { drawerWidth: string }) => {
  const navigate = useNavigate();
  const muiTheme = useTheme();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box display="flex" flexDirection="column" padding={muiTheme.spacing(2)}>
        <Box display="flex" justifyContent="center">
          <Avatar />
        </Box>
        <Box>
          <List component={"nav"} >
            <ListItemButton
              onClick={() => {
                navigate("/user/user-info");
              }}
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={faPerson} />
              </ListItemIcon>
              <ListItemText primary="User Info" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/user/tasks");
              }}
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={faCalendar} />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/user/configuration");
              }}
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={faGear} />
              </ListItemIcon>
              <ListItemText primary="Configuration" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/login");
              }}
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={faCircleLeft} />
              </ListItemIcon>
              <ListItemText primary="Leave" />
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
