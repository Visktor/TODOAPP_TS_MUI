import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, Paper, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, useReducer } from "react";
import alphabeticStrValidation from "./../../utils/validateAlphabeticStr";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";
import { TaskItem } from "../TaskListing/Items";

export const TasksStyles: { [key: string]: object } = {
  paper: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "max-content",
    alignItems: "center",
    color: "#C53955",
    fontWeight: "bolder",
  },
};

export interface inputState {
  [key: string]: string | boolean;
  value: string;
  error: boolean;
}

export interface Itask {
  title?: string;
  id: string;
  description: string;
}

interface ItasksState {
  [key: string]: Array<Itask> | inputState;
  taskDescription: inputState;
  taskTitle: inputState;
  tasksArray: Array<Itask>;
}

interface ItasksAction {
  type:
  | "changeTaskDescription"
  | "changeTasktitle"
  | "addTask"
  | "deleteTask"
  | "editTask";
  payload: string | Itask;
  error?: boolean;
  taskIndex?: number;
}

const initialValue: ItasksState = {
  taskTitle: { value: "", error: false },
  taskDescription: { value: "", error: false },
  tasksArray: [],
};

function funcReducer(state: ItasksState, action: ItasksAction): ItasksState {
  const cases: {
    [type: string]: (state: ItasksState, action: ItasksAction) => ItasksState;
  } = {
    changeTaskDescription: (state, action) => ({
      ...state,
      taskDescription: {
        value: typeof action.payload === "string" ? action.payload : "",
        error: action.error ?? false,
      },
    }),

    changeTasktitle: (state, action) => ({
      ...state,
      taskTitle: {
        value: typeof action.payload === "string" ? action.payload : "",
        error: action.error ?? false,
      },
    }),

    addTask: (state, action) => {
      const arrayCopy = [...state.tasksArray];
      if (typeof action.payload === "object") {
        arrayCopy.push(action.payload);
        return { ...initialValue, tasksArray: arrayCopy };
      }
      return state;
    },
    deleteTask: (state, action) => {
      const arrayCopy = [...state.tasksArray].filter(
        (task) => task.id !== action.payload
      );

      return { ...state, tasksArray: arrayCopy };
    },
    editTask: (state, action) => {
      const arrayCopy = [...state.tasksArray];
      if (action.taskIndex && typeof action.payload === "object") {
        arrayCopy[action.taskIndex] = action.payload;
      }
      return {
        ...state,
        tasksArray: arrayCopy,
      };
    },
    default: (state) => state,
  };

  return action.type && cases[action.type]
    ? cases[action.type](state, action)
    : cases.default(state, action);
}

export const Tasks = () => {
  const [tasksState, dispatchTasks]: [ItasksState, Dispatch<ItasksAction>] =
    useReducer(funcReducer, initialValue);

  function handleAddButtonClick() {
    if (
      !tasksState.taskDescription.value ||
      tasksState.taskDescription.error ||
      tasksState.taskTitle.error
    ) {
      window.alert("Invalid input.");
      return;
    }

    dispatchTasks({
      type: "addTask",
      payload: {
        description: tasksState.taskDescription.value,
        title: tasksState.taskTitle.value,
        id: nanoid(40),
      },
    });
  }

  function handleTaskChanges(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "changeTaskDescription" | "changeTasktitle"
  ) {
    const error =
      !e.currentTarget.value ||
      !alphabeticStrValidation(e.currentTarget.value, "all");
    console.log("error:", error);
    dispatchTasks({
      type: type,
      payload: e.currentTarget.value,
      error: error,
    });
  }

  return (
    <Grid container>
      <Grid item xs={12} mb={3} display="flex" justifyContent="center">
        <Paper elevation={3} style={TasksStyles.paper}>
          <div>{" TODO LIST "}</div>
          <div>
            {"Organize all your goals and deadlines in a single place."}
          </div>
        </Paper>
      </Grid>
      <Grid item container spacing={2} display="flex" alignItems="center">
        <Grid item xs={4}>
          <TextField
            fullWidth
            error={tasksState.taskTitle.error}
            label="Title (optional)"
            value={tasksState.taskTitle.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleTaskChanges(e, "changeTasktitle")
            }
          />
        </Grid>
        <Grid item xs={true}>
          <TextField
            fullWidth
            multiline
            error={tasksState.taskDescription.error}
            label="Description"
            value={tasksState.taskDescription.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleTaskChanges(e, "changeTaskDescription")
            }
          />
        </Grid>
        <Grid item xs={"auto"}>
          <IconButton
            onClick={handleAddButtonClick}
            style={{ borderRadius: "3px", backgroundColor: "#C53955" }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item container xs={12} mt={2}>
        <Grid container item spacing={1}>
          {tasksState.tasksArray.map((task, index) => {
            return (
              <TaskItem
                task={task}
                saveAlteredTaskFunc={(task: Itask) => {
                  dispatchTasks({
                    type: "editTask",
                    payload: task,
                    taskIndex: index,
                  });
                }}
              />
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};
