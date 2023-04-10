import { Grid, IconButton, Paper, TextField } from "@mui/material";
import { useReducer } from "react";
import { inputState, Itask, TasksStyles } from "../tasks/Tasks";

interface ItaskState {
  [key: string]: object | null | boolean;
  taskValues: { taskTitle: inputState; taskDescription: inputState } | null;
  isTaskEditable: boolean;
}

interface ItaskEditable {
  type: "taskEditable";
  editable: boolean;
}

interface IchangeValues {
  type: "changeTaskValues";
  payload: string;
  error: boolean;
}

type ItaskAction = IchangeValues | ItaskEditable;

function funcTaskReducer(state: ItaskState, action: ItaskAction) {
  // FIX: rewind typing to single instead of UNION
  const cases: {
    [key: string]: (state: ItaskState, action: ItaskAction) => ItaskState;
  } = {
    setEditable: (state, action) => {
      return {
        ...state,
        isTaskEditable: action.editable ?? false,
      };
    },
  };
  return state;
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
  const [taskState, dispatchTask] = useReducer(funcTaskReducer, initialValues);

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
        <IconButton
          onClick={() => {
            // FIX: typing of dispatch action is iffy.
            // Can't have multiple types coexisting within action object
            dispatchTask({ type: "taskEditable", payload: task.id });
          }}
        ></IconButton>
      </Grid>
      <Grid item>
        <IconButton></IconButton>
      </Grid>
    </Grid>
  );
};
