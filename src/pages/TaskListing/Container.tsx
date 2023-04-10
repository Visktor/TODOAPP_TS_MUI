import { Grid } from "@mui/material";
// FIX: recently split component missing props and type annotations

export const TaskContainer = ({ tasks }: { tasks: Array<Itask> }) => {
  return (
    <Grid container item spacing={1}>
      {tasks.map((task: Itask, index: number) => {
        return (
        <div></div>
          );
      })}
    </Grid>
  );
};
