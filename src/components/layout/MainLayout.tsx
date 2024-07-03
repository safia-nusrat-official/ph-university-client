import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { adminPaths, adminSideBarLinks } from "../../routes/admin.routes";

const { Content, Sider } = Layout;

const items = adminSideBarLinks;
console.log(items);
const MainLayout = () => {
  return (
    <Layout
      style={{
        height: "100vh",
        color: "#fff",
      }}
    >
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
            marginBottom:"1rem"
          }}
        >
          <span className="logo">PH Univeristy</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["Dashboard"]}
          items={items}
        />
      </Sider>

      <Content style={{ margin: "24px 16px 0" }}>
        <Outlet></Outlet>
      </Content>
    </Layout>
  );
};

export default MainLayout;
