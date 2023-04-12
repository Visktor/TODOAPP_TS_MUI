import { Grid } from "@mui/material";
import { Itask } from "../tasks/Tasks";
import { TaskItem } from "./Items";
// FIX: recently split component missing props and type annotations

export const TaskContainer = ({ tasks }: { tasks: Itask[] }) => {
  return (
    <Grid container item spacing={1}>
      {tasks.map((task, index) => {
        return (
          <TaskItem
            task={task}
            saveAlteredTaskFunc={(task) => {}}
          />
        );
      })}
    </Grid>
  );
};
