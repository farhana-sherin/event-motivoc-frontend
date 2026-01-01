import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // ✅ track role
  const [loading, setLoading] = useState(true); // ✅ track loading

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role"); // ✅ read role
    setIsAuthenticated(!!token);
    setRole(storedRole); // ✅ set role
    setLoading(false); // ✅ done checking
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole); // ✅ store role
    setIsAuthenticated(true);
    setRole(userRole); // ✅ update state
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // ✅ clear role
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
