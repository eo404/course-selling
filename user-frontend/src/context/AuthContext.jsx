import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("user_token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user_info");
    return raw ? JSON.parse(raw) : null;
  });

  const login = (newToken, userInfo) => {
    localStorage.setItem("user_token", newToken);
    localStorage.setItem("user_info", JSON.stringify(userInfo || {}));
    setToken(newToken);
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_info");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
