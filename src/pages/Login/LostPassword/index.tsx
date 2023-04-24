import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Fade, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";

export const Recovery = ({
  onLostPassword,
  toggleLostPassword,
  toggleLogin,
}: {
  onLostPassword: boolean;
  toggleLostPassword: () => void;
  toggleLogin: () => void;
}) => {
  const [email, setEmail] = useState<string>("");

  return (
    <Fade
      in={onLostPassword}
      onExited={() => {
        toggleLogin();
      }}
      mountOnEnter
      unmountOnExit
    >
      <Grid container>
        <Grid item xs={12} display="flex" justifyContent="end">
          <IconButton
            onClick={() => {
              toggleLostPassword();
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained">{"RECOVER"}</Button>
        </Grid>
      </Grid>
    </Fade>
  );
};
