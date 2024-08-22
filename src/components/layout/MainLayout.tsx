import { Layout, Button } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { toast, Toaster } from "sonner";
import ProfileCard from "../user/profileCard";

const { Content, Header } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    toast.message(`logging out`);
    dispatch(logout());
  };
  return (
    <Layout
      style={{
        color: "#fff",
        height: "100vh",
      }}
    >
      <SideBar></SideBar>
      <Layout
        style={{
          backgroundColor: "#eee",
        }}
      >
        <Header
          style={{
            backgroundColor: "#e5e5e5",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <ProfileCard></ProfileCard>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet></Outlet>
          <Toaster richColors={true}></Toaster>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
