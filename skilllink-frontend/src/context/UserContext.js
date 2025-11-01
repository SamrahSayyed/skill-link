// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser as dsGetCurrentUser } from "../api/dataService";
import { mockUsers } from "../data/mockData";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(mockUsers); // ✅ Keep mock user list for signup simulation

  useEffect(() => {
    const currentUser = dsGetCurrentUser();
    if (currentUser) setUser(currentUser);
  }, []);

  // ✅ LOGIN FUNCTION
  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  // ✅ SIGNUP FUNCTION
  const signup = (name, email, password) => {
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) return false; // email already exists

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      profileImage: "",
      bio: "",
      location: "",
      role: "",
      skills: [],
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUser(newUser);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    return true;
  };

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout }}>
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
