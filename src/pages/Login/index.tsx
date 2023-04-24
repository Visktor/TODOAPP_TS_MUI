import { Button, Fade, Grid, Paper, TextField } from "@mui/material";
import { useRef, useState } from "react";
import useToggle from "../../shared/hooks/Toggle";
import Registration from "./Registration";
import { useNavigate } from "react-router-dom";
import { Recovery } from "./LostPassword";

const initialUserInfo = {
  username: { value: "", error: false },
  password: { value: "", error: false },
};

const Login = () => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [onRegistration, toggleRegistration] = useToggle(false);
  const [onLostPassword, toggleLostPassword] = useToggle(false);
  const [onLogin, toggleLogin] = useToggle(true);
  const animationToOpen = useRef<string | null>(null);
  const navigate = useNavigate();

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Grid container item xs={12} md={6} lg={3}>
        <Paper
          elevation={5}
          style={{
            padding: "16px",
            height: "min-content",
          }}
        >
          <Fade
            mountOnEnter
            unmountOnExit
            timeout={250}
            in={onLogin}
            onExited={() => {
              if (animationToOpen.current === "password") {
                toggleLostPassword();
              }
              if (animationToOpen.current === "registration") {
                toggleRegistration();
              }
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <TextField
                  label="Username"
                  fullWidth
                  value={userInfo.username.value}
                  error={userInfo.username.error}
                  onChange={(e) => {
                    setUserInfo((prevState) => ({
                      ...prevState,
                      username: { value: e.target.value, error: false },
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <TextField
                  label="Password"
                  fullWidth
                  value={userInfo.password.value}
                  error={userInfo.password.error}
                  onChange={(e) => {
                    setUserInfo((prevState) => ({
                      ...prevState,
                      password: { value: e.target.value, error: false },
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  onClick={() => {
                    navigate("/user/landing");
                  }}
                  variant="contained"
                >
                  {"Login"}
                </Button>
              </Grid>
              <Grid container item spacing={1} mt="50px">
                <Grid item xs={6} display="flex" justifyContent="center">
                  <Button
                    disabled={!onLogin}
                    variant="contained"
                    onClick={() => {
                      animationToOpen.current = "registration";
                      toggleLogin();
                    }}
                  >
                    {"Create Account"}
                  </Button>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="center">
                  <Button
                    disabled={!onLogin}
                    variant="contained"
                    onClick={() => {
                      animationToOpen.current = "password";
                      toggleLogin();
                    }}
                  >
                    {"Recover Account"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Fade>

          <Recovery
            onLostPassword={onLostPassword}
            toggleLostPassword={toggleLostPassword}
            toggleLogin={toggleLogin}
          />

          <Registration
            onRegistration={onRegistration}
            toggleRegistration={toggleRegistration}
            toggleLogin={toggleLogin}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
