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
  taskValues: {
    taskTitle: inputState;
    taskDescription: inputState;
    taskId: string;
  };
  isTaskEditable: boolean;
}

interface Iaction {
  type: keyof typeof cases;
  payload?: string | boolean;
  error?: boolean;
  key?: keyof ItaskState;
}

const cases: {
  [key: string]: (state: ItaskState, action: Iaction) => ItaskState;
} = {
  setEditable: (state, action) => {
    return {
      ...state,
      isTaskEditable: !state.isTaskEditable,
    };
  },
  changeTaskValues: (state, action) => {
    return action.key
      ? {
        ...state,
        [action.key]: { value: action.payload, error: action.error },
      }
      : state;
  },
};

function funcTaskReducer(state: ItaskState, action: Iaction): ItaskState {
  return cases[action.type]
    ? cases[action.type](state, action)
    : cases.default(state, action);
}

export const TaskItem = ({
  task,
  saveAlteredTaskFunc,
  deleteTask,
}: {
  task: Itask;
  saveAlteredTaskFunc: (task: Itask) => void;
  deleteTask: (id: number) => void;
}) => {
  const [taskState, dispatchTask]: [ItaskState, Dispatch<Iaction>] = useReducer(
    funcTaskReducer,
    {
      taskValues: {
        taskTitle: { value: "", error: false },
        taskDescription: { value: "", error: false },
        taskId: "0",
      },
      isTaskEditable: false,
    }
  );

  function handleTaskEditButton() {
    if (!taskState.isTaskEditable) {
      dispatchTask({ type: "setEditable" });
    } else {
      saveAlteredTaskFunc({
        title: taskState.taskValues?.taskTitle.value,
        description: taskState.taskValues.taskDescription.value,
        id: taskState.taskValues.taskId,
      });
    }
  }

  return (
    <Grid item container spacing={2}>
      <Grid item xs={4}>
        {!taskState.isTaskEditable ? (
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
            value={taskState.taskValues?.taskTitle.value}
            onChange={(e) => {
              dispatchTask({ type: "" });
            }}
          />
        )}
      </Grid>
      <Grid item xs={true}>
        {!taskState.isTaskEditable ? (
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
            value={taskState.taskValues?.taskDescription.value}
          />
        )}
      </Grid>
      <Grid container item xs={"auto"}>
        <Grid item>
          {/* Edit and Delete */}
          <IconButton onClick={() => handleTaskEditButton()}>
            <FontAwesomeIcon
              icon={!taskState.isTaskEditable ? faPencil : faCheckCircle}
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
