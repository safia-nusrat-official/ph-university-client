import EnrolledCourse from "../pages/student/enrolledCourse";
import StudentDashboard from "../pages/student/studentDashboard";
import { TUserPath } from "../types/userPath";

export const studentPaths: TUserPath[] = [
  {
    name: "Enrolled Courses",
    path: "enrolled-courses",
    element: <EnrolledCourse></EnrolledCourse>,
  },
  {
    name: "Dashboard",
    element: <StudentDashboard></StudentDashboard>,
    path: "dashboard",
    index: true,
  },
];

console.log(studentPaths);
