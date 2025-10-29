// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser as dsGetCurrentUser } from "../api/dataService";
import { mockUsers } from "../data/mockData"; // ✅ Correct import

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = dsGetCurrentUser();
    if (currentUser) setUser(currentUser);
  }, []);

  const login = (email, password) => {
    // ✅ Find the user inside mockUsers array
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser)); // optional for persistence
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser"); // optional
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
