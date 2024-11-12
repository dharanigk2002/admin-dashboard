import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../backend/api";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  useEffect(() => {
    if (!admin)
      getCurrentUser()
        .then((res) => {
          setAdmin(res.user);
          localStorage.setItem("user", JSON.stringify(res.user));
        })
        .catch((err) => console.error(err.message));
  }, [admin]);
  return (
    <AuthContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context is accessed outside");
  return context;
}

export default AuthProvider;
