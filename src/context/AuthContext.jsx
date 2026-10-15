import { createContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (userData, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;

    localStorage.removeItem("authUser");
    sessionStorage.removeItem("authUser");

    storage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser;

      const updatedUser = {
        ...currentUser,
        ...updatedData,
      };

      if (localStorage.getItem("authUser")) {
        localStorage.setItem(
          "authUser",
          JSON.stringify(updatedUser)
        );
      } else if (sessionStorage.getItem("authUser")) {
        sessionStorage.setItem(
          "authUser",
          JSON.stringify(updatedUser)
        );
      }

      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}