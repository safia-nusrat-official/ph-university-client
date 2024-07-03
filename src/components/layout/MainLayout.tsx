import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout
      style={{
        height: "100vh",
        color: "#fff",
      }}
    >
      <SideBar></SideBar>

      <Content style={{ margin: "24px 16px 0" }}>
        <Outlet></Outlet>
      </Content>
    </Layout>
  );
};

export default MainLayout;
