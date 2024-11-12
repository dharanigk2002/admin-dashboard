import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthProvider.jsx";
import Login from "./pages/login/Login.jsx";
import AdminPanel from "./pages/panel/AdminPanel.jsx";
import Employee from "./pages/employees/Employee.jsx";
import CreateEmployee from "./pages/createEmployee/CreateEmployee.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";

function App() {
  const { admin } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={admin ? <AdminPanel /> : <Navigate to="/login" />}
      >
        <Route
          index
          element={
            <h1 style={{ textAlign: "center" }}>Welcome to dashboard</h1>
          }
        />
        <Route path="employees" element={<Employee />} />
        <Route path="create" element={<CreateEmployee />} />
        <Route path="edit/:id" element={<CreateEmployee />} />
      </Route>
      <Route path="/login" element={admin ? <Navigate to="/" /> : <Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
