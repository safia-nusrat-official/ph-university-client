import AdminDashboard from "../pages/admin/adminDashboard";
import CreateStudent from "../pages/admin/userManagement/createStudent";
import CreateFaculty from "../pages/admin/userManagement/createFaculty";
import CreateAdmin from "../pages/admin/userManagement/createAdmin";
import ProtectedRoute from "../pages/protectedRoute";
import AcademicSemester from "../pages/admin/academicManagement/academicSemesters/academicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/academicSemesters/createAcademicSemester";
import AcademicFaculty from "../pages/admin/academicManagement/academicFaculty/AcademicFaculty";
import AcademicDepartment from "../pages/admin/academicManagement/academicDepartment.tsx/AcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/academicFaculty/createAcademicFaculty";
import CreateAcademicDepartment from "../pages/admin/academicManagement/academicDepartment.tsx/createAcademicDepartment";

export const adminPaths = [
  {
    name: "Dashboard",
    index: true,
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard></AdminDashboard>
      </ProtectedRoute>
    ),
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin></CreateAdmin>,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty></CreateFaculty>,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent></CreateStudent>,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <CreateStudent></CreateStudent>,
      },
    ],
  },
  {
    name: "Semester Management",
    children: [
      {
        name: "Academic Semesters",
        path: "academic-semester",
        element: <AcademicSemester></AcademicSemester>,
      },
      {
        path: "create-academic-semester",
        element: <CreateAcademicSemester></CreateAcademicSemester>,
      },
    ],
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty></AcademicFaculty>,
        children: [
          {
            name: "Create Academic Faculty",
            path: "create-academic-faculty",
            element: <CreateAcademicFaculty></CreateAcademicFaculty>,
          },
        ],
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment></AcademicDepartment>,
        children: [
          {
            name: "Create Academic Department",
            path: "create-academic-department",
            element: <CreateAcademicDepartment></CreateAcademicDepartment>,
          },
        ],
      },
    ],
  },
];
