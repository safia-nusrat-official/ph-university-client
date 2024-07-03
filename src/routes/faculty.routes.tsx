import FacultyDashboard from "../pages/faculty/facultyDashboard";
import { TUserPath } from "../types/userPath";

export const facultyPaths: TUserPath[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard></FacultyDashboard>,
    index: true,
  },
];
