import { NavLink, Outlet } from "react-router-dom";
import styles from "./adminPanel.module.css";
import { useAuth } from "../../context/AuthProvider";
import { logout } from "../../backend/api";

function AdminPanel() {
  const { admin, setAdmin } = useAuth();
  async function handleClick() {
    try {
      await logout();
      setAdmin(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className={styles.panelWrapper}>
      <nav>
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="employees">Employee List</NavLink>
        </div>
        <div>
          <p>{admin}</p>
          <button onClick={handleClick}>Logout</button>
        </div>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;
