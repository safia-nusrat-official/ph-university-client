import { Layout, Menu } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { generateSideBarLinks } from "../../routes/routes.utils";
import { TSidebarLink } from "../../types";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { getUser } from "../../redux/features/auth/authSlice";
const { Sider } = Layout;

const SideBar = () => {
  let sideBarItems: TSidebarLink[] = [];

  const userRoles = {
    ADMIN: "admin",
    SUPER_ADMIN: "superAdmin",
    FACULTY: "faculty",
    STUDENT: "student",
  };

  const { role } = useAppSelector(getUser);
  console.log(role)
  switch (role) {
    case userRoles.ADMIN:
      sideBarItems = generateSideBarLinks(adminPaths, "admin");
      break;
    case userRoles.SUPER_ADMIN:
      sideBarItems = generateSideBarLinks(adminPaths, "admin");
      break;
    case userRoles.FACULTY:
      sideBarItems = generateSideBarLinks(facultyPaths, "faculty");
      break;
    case userRoles.STUDENT:
      sideBarItems = generateSideBarLinks(studentPaths, "student");
      break;
    default:
      break;
  }
  console.log(sideBarItems);
  return (
    <Sider
      style={{
        padding: ".5rem",
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
    </Sider>
  );
};

export default SideBar;
