// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Backend base URL
  const API_URL = "http://localhost:5000/api/users";

  // 🔹 Load user from localStorage on app start
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  // ---------------- LOGIN ----------------
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password_hash: password, // send raw password, backend hashes it
      });

      const loggedInUser = res.data.user;
      setUser(loggedInUser);
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Login failed. Try again.";
      return { success: false, error: errorMessage };
    }
  };

  // ---------------- SIGNUP ----------------
  const signup = async ({ username, email, password }) => {
    try {
      const res = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password_hash: password, // backend hashes it
        location: "",            // optional fields
        bio: "",
      });

      const newUser = res.data;
      setUser(newUser);
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Signup failed. Try again.";
      return { success: false, error: errorMessage };
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
}; // ✅ This closing brace was missing

// ---------------- CUSTOM HOOK ----------------
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
