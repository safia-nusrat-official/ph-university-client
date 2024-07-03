import { Layout, Menu } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { generateSideBarLinks } from "../../routes/routes.utils";
import { TSidebarLink } from "../../types";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
const { Sider } = Layout;

const SideBar = () => {
  let sideBarItems: TSidebarLink[] = [];

  const role = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
  };

  const userRole = "faculty";

  switch (userRole) {
    case role.ADMIN:
      sideBarItems = generateSideBarLinks(adminPaths, "admin");
      break;
    case role.FACULTY:
      sideBarItems = generateSideBarLinks(facultyPaths, "faculty");
      break;
    case role.STUDENT:
      sideBarItems = generateSideBarLinks(studentPaths, "student");
      break;
    default:
      break;
  }
  console.log(sideBarItems)
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
