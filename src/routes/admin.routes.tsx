import AdminDashboard from "../pages/admin/adminDashboard";
import CreateStudent from "../pages/admin/createStudent";
import CreateFaculty from "../pages/admin/createFaculty";
import CreateAdmin from "../pages/admin/createAdmin";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export const adminPaths = [
  {
    name: "Dashboard",
    index: true,
    path: "dashboard",
    element: <AdminDashboard></AdminDashboard>,
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

type TRoute = {
  path?: string;
  element: ReactNode;
  index?: boolean;
};
export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
  if (item.index) {
    acc.push({
      element: item.element,
      index: item.index,
    });
  }
  if (item.element && item.path) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  if (item.children) {
    item.children.forEach((child) =>
      acc.push({
        path: child.path,
        element: child.element,
      })
    );
  }
  return acc;
}, []);

type TLink = { key: string; label: ReactNode; children?: TLink[] };

export const adminSideBarLinks = adminPaths.reduce((acc: TLink[], item) => {
  if (item.name && item.path) {
    acc.push({
      key: item.name,
      label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
    });
  }
  if (item.children) {
    acc.push({
      key: item.name,
      label: <NavLink to={`/admin/${item.path ?? ""}`}>{item.name}</NavLink>,
      children: item.children.map((child) => ({
        key: child.name,
        label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
      })),
    });
  }
  return acc;
}, []);