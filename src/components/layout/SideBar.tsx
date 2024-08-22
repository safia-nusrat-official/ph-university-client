import { Layout, Menu } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { generateSideBarLinks } from "../../routes/routes.utils";
import { TSidebarLink } from "../../types";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { getUser, TUser } from "../../redux/features/auth/authSlice";
const { Sider } = Layout;

const SideBar = () => {
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
        flexDirection: "column",
        height: "100%",
      }}
      width={275}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div
        className="demo-logo-vertical"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        <span className="logo">PH Univeristy</span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        items={sideBarItems}
        style={{
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      />
    </Sider>
  );
};

export default SideBar;
