import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, Paper, TextField } from "@mui/material";
import { Dispatch, useReducer } from "react";
import { inputState, Itask, TasksStyles } from "../tasks/Tasks";
import {
  faPencil,
  faTrash,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface ItaskState {
  [key: string]: object | null | boolean;
  taskValues: { taskTitle: inputState; taskDescription: inputState } | null;
  isTaskEditable: boolean;
}

interface Iaction {
  type: "setEditable" | "changeTaskValues";
  payload?: string | boolean;
  error?: boolean;
}

function funcTaskReducer(state: ItaskState, action: Iaction): ItaskState {
  const cases: {
    [key: string]: (state: ItaskState, action: Iaction) => ItaskState;
  } = {
    setEditable: (state, action) => {
      return {
        ...state,
        isTaskEditable: !state.isTaskEditable,
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

export const TaskItem = ({
  task,
  saveAlteredTaskFunc,
}: {
  task: Itask;
  saveAlteredTaskFunc: (task: Itask) => void;
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
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={taskState.taskValues?.taskTitle}
          />
        )}
      </Grid>
      <Grid item xs={true}>
        {taskState.isTaskEditable ? (
          <Paper
            elevation={3}
            style={{ ...TasksStyles.paper, padding: "8px 0", width: "100%" }}
          >
            {task.description}
          </Paper>
        ) : (
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={taskState.taskValues?.taskTitle}
          />
        )}
      </Grid>
      <Grid container item xs={"auto"}>
        <Grid item>
          {/* Edit and Delete */}
          <IconButton
            onClick={() => {
              dispatchTask({ type: "setEditable" });
            }}
          >
            <FontAwesomeIcon
              icon={taskState.isTaskEditable ? faPencil : faCheckCircle}
            />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
