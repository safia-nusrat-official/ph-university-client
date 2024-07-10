import { Button, Layout, Menu } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { generateSideBarLinks } from "../../routes/routes.utils";
import { TSidebarLink } from "../../types";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUser, logout, TUser } from "../../redux/features/auth/authSlice";
import { NavLink } from "react-router-dom";
import { toast, Toaster } from "sonner";
const { Sider } = Layout;

const SideBar = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    toast.message(`logging out`);
    dispatch(logout());
  };
  let sideBarItems: TSidebarLink[] = [];

  const userRoles = {
    ADMIN: "admin",
    SUPER_ADMIN: "superAdmin",
    FACULTY: "faculty",
    STUDENT: "student",
  };

  const { role } = useAppSelector(getUser) as TUser;
  switch (role) {
    case userRoles.ADMIN:
      sideBarItems.push(...generateSideBarLinks(adminPaths, "admin"));
      break;
    case userRoles.SUPER_ADMIN:
      sideBarItems.push(...generateSideBarLinks(adminPaths, "admin"));
      break;
    case userRoles.FACULTY:
      sideBarItems.push(...generateSideBarLinks(facultyPaths, "faculty"));
      break;
    case userRoles.STUDENT:
      sideBarItems.push(...generateSideBarLinks(studentPaths, "student"));
      break;
    default:
      break;
  }

  return (
    <Sider
      style={{
        display: "flex",
        flexDirection: "column"
      }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        className="demo-logo-vertical"
        style={{
          fontSize: "20px",
          fontWeight: "semibold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <span className="logo">PH Univeristy</span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        items={sideBarItems}
      />
      <div>
        <Button onClick={handleLogout} className="font-semibold mt-6">Logout</Button>
      </div>
      <Toaster></Toaster>
    </Sider>
  );
};

export default SideBar;
