// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/dataService";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
