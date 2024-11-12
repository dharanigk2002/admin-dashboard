import { useState } from "react";
import styles from "./Login.module.css";
import { login } from "../../backend/api";
import { useAuth } from "../../context/AuthProvider";
const initialState = {
  username: "",
  password: "",
};
function Login() {
  const { setAdmin } = useAuth();
  const [error, setError] = useState(initialState);
  const [formData, setFormData] = useState(initialState);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.username) {
      setError({ ...initialState, username: "Username is required" });
      return;
    }
    if (!formData.password) {
      setError({ ...initialState, password: "Password is required" });
      return;
    }
    setError(initialState);
    try {
      const response = await login(formData);
      setAdmin(response.user);
      setFormData(initialState);
    } catch (error) {
      alert(error.message);
    }
  }
  function handleChange(e) {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }
  return (
    <div className={styles.formWrapper}>
      <h1>Login</h1>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.loginForm}
        method="post"
      >
        <div className={styles.inputField}>
          <label htmlFor="username">Username</label>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <p className={styles.error}>{error.username && error.username}</p>
          </div>
        </div>
        <div className={styles.inputField}>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <p className={styles.error}>{error.password && error.password}</p>
          </div>
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
