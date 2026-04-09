import { createContext, useState, useEffect } from "react";
import { setAuthToken } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setAuthToken(token);
    } else {
      localStorage.removeItem("token");
      setAuthToken(null);
    }
  }, [token]);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
  };

  // simple helper to reuse login flow after register
  const register = (userData, jwt) => login(userData, jwt);

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
