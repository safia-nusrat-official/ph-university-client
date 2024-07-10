import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./pages/protectedRoute";

const App = () => {
  return <ProtectedRoute>
    <MainLayout></MainLayout>
    </ProtectedRoute>;
};

export default App;
