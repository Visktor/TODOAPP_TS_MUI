import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Fade, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";

const initialUserInfo = {
  name: { value: "", error: false },
  age: { value: "", error: false },
  address: "",
  country: { value: "", error: false },
  username: { value: "", error: false },
  password: { value: "", error: false },
};

export default function Registration({
  onRegistration,
  toggleRegistration,
  toggleLogin,
}: {
  onRegistration: boolean;
  toggleRegistration: () => void;
  toggleLogin: () => void;
}) {
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  function handleInputChanges(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof typeof initialUserInfo,
    error: boolean = false
  ) {
    setUserInfo((state) => ({
      ...state,
      [key]: { value: e.target.value, error: error },
    }));
  }

  function register() {
    // TODO: API CALL TO REGISTER NEW USER
  }

  return (
    <Fade
      in={onRegistration}
      timeout={250}
      mountOnEnter
      unmountOnExit
      onExited={() => {
        toggleLogin();
      }}
    >
      <Grid container item>
        <Grid xs={12} item>
          <IconButton
            onClick={() => {
              toggleRegistration();
            }}
          >
            <FontAwesomeIcon color="blue" icon={faArrowLeft} />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            value={userInfo.name.value}
            onChange={(e) => {
              handleInputChanges(e, "name", false);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            value={userInfo.age.value}
            onChange={(e) => {
              handleInputChanges(e, "age", false);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            value={userInfo.address}
            onChange={(e) => {
              handleInputChanges(e, "address", false);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            value={userInfo.username.value}
            onChange={(e) => {
              handleInputChanges(e, "username", false);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            onChange={(e) => {
              handleInputChanges(e, "password", false);
            }}
            value={userInfo.password.value}
          />
        </Grid>
        <Button onClick={() => { }}>{"Submit"}</Button>
      </Grid>
    </Fade>
  );
}
