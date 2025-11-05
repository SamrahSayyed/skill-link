// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Loading state

  // Backend base URL
  const API_URL = "http://localhost:5000/api/users";

  // Load user from localStorage on app start
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    setLoadingUser(false); // Finished loading
  }, []);

  // ---------------- LOGIN ----------------
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const loggedInUser = res.data.user;

      setUser(loggedInUser);
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      return { success: true, user: loggedInUser };
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed. Try again.";
      return { success: false, error: errorMessage };
    }
  };

  // ---------------- SIGNUP ----------------
 const signup = async ({ username, email, password, location = "", bio = "" }) => {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      location,
      bio,
    });

    // Use the backend returned user object
    const createdUser = res.data;

    setUser(createdUser);
    localStorage.setItem("loggedInUser", JSON.stringify(createdUser));

    return { success: true, user: createdUser };
  } catch (err) {
    const errorMessage = err.response?.data?.error || err.message || "Signup failed";
    return { success: false, error: errorMessage };
  }
};


  // ---------------- LOGOUT ----------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <UserContext.Provider value={{ user, loadingUser, setUser, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ---------------- CUSTOM HOOK ----------------
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
