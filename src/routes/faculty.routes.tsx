import FacultyDashboard from "../pages/faculty/facultyDashboard";
import ProtectedRoute from "../pages/protectedRoute";
import { TUserPath } from "../types/userPath";

export const facultyPaths: TUserPath[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <ProtectedRoute><FacultyDashboard></FacultyDashboard></ProtectedRoute>,
    index: true,
  },
];
