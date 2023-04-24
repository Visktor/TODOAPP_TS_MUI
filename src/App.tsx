import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error } from "./Error";
import { Layout } from "./pages/Layout";
import Login from "./pages/Login";
import { Tasks } from "./pages/tasks/Tasks";
import { MuiThemeProvider } from "./shared/contexts/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/user",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/user/landing",
        element: <Tasks />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <MuiThemeProvider>
      <RouterProvider router={router} />
    </MuiThemeProvider>
  );
};
