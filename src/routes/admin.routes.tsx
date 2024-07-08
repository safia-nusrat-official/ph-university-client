import AdminDashboard from "../pages/admin/adminDashboard";
import CreateStudent from "../pages/admin/createStudent";
import CreateFaculty from "../pages/admin/createFaculty";
import CreateAdmin from "../pages/admin/createAdmin";
import ProtectedRoute from "../pages/protectedRoute";

export const adminPaths = [
  {
    name: "Dashboard",
    index: true,
    path: "dashboard",
    element: <ProtectedRoute><AdminDashboard></AdminDashboard></ProtectedRoute>,
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
];