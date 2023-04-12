import { Grid, IconButton, Paper, TextField } from "@mui/material";
import { Dispatch, useReducer } from "react";
import { inputState, Itask, TasksStyles } from "../tasks/Tasks";

interface ItaskState {
  [key: string]: object | null | boolean;
  taskValues: { taskTitle: inputState; taskDescription: inputState } | null;
  isTaskEditable: boolean;
}

interface Iaction {
  type: "taskEditable" | "changeTaskValues";
  payload: string | boolean;
  error?: boolean;
}

function funcTaskReducer(state: ItaskState, action: Iaction): ItaskState {
  const cases: {
    [key: string]: (state: ItaskState, action: Iaction) => ItaskState;
  } = {
    setEditable: (state, action) => {
      return {
        ...state,
        isTaskEditable:
          typeof action.payload === "boolean" ? action.payload : false,
      };
    },
  };
  return cases[action.type]
    ? cases[action.type](state, action)
    : cases.default(state, action);
}

const initialValues: ItaskState = {
  taskValues: null,
  isTaskEditable: false,
};

const TaskItem = ({
  task,
  saveAlteredTaskFunc,
}: {
  task: Itask;
  saveAlteredTaskFunc: () => void;
}) => {
  const [taskState, dispatchTask]: [ItaskState, Dispatch<Iaction>] = useReducer(
    funcTaskReducer,
    initialValues
  );

  return (
    <Grid item container spacing={2}>
      <Grid item xs={4}>
        {taskState.isTaskEditable ? (
          <Paper
            elevation={3}
            style={{ ...TasksStyles.paper, padding: "8px 0", width: "100%" }}
          >
            {task.title}
          </Paper>
        ) : (
          <TextField value={taskState.taskValues?.taskTitle} />
        )}
      </Grid>
      <Grid item xs={8}>
        <Paper
          elevation={3}
          style={{ ...TasksStyles.paper, padding: "8px 0", width: "100%" }}
        >
          {task.description}
        </Paper>
      </Grid>
      <Grid item>
        {/* Edit and Delete */}
        <IconButton
          onClick={() => {
            dispatchTask({ type: "taskEditable", payload: true });
          }}
        ></IconButton>
      </Grid>
      <Grid item>
        <IconButton></IconButton>
      </Grid>
    </Grid>
  );
};
