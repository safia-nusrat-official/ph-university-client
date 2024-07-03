import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminRoutes } from "./admin.routes";

console.log(adminRoutes)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "admin",
        children:adminRoutes,
      },
    ],
  },
  {
    path: "/login",
  },
]);

export default router;
