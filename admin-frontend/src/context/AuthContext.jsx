import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const [admin, setAdmin] = useState(() => {
    const raw = localStorage.getItem("admin_info");
    return raw ? JSON.parse(raw) : null;
  });

  const login = (newToken, adminInfo) => {
    localStorage.setItem("admin_token", newToken);
    localStorage.setItem("admin_info", JSON.stringify(adminInfo || {}));
    setToken(newToken);
    setAdmin(adminInfo);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_info");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
