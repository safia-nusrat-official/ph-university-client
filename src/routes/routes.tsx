import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { studentPaths } from "./student.routes";
import { generateRoutes } from "./routes.utils";
import { facultyPaths } from "./faculty.routes";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "admin",
        children: generateRoutes(adminPaths),
      },
      {
        path: "student",
        children: generateRoutes(studentPaths),
      },
      {
        path: "faculty",
        children: generateRoutes(facultyPaths),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
]);

export default router;
