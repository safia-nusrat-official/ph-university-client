import { NavLink } from "react-router-dom";
import { TRoute, TSidebarLink } from "../types/index";
import { TUserPath } from "../types/userPath";

export function generateRoutes(items: TUserPath[]) {
  const routes =
    items &&
    items.reduce((acc: TRoute[], item) => {
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

  return routes;
}

export function generateSideBarLinks(
  items: TUserPath[],
  role: "admin" | "faculty" | "student"
) {
  const sidebarItems = items.reduce((acc: TSidebarLink[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: (
          <NavLink to={`/${role}/${item.path ?? ""}`}>{item.name}</NavLink>
        ),
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }
    return acc;
  }, []);

  return sidebarItems;
}
