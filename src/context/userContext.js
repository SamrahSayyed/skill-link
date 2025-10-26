// src/context/UserContext.js
import React, { createContext, useContext, useState } from "react";
import { currentUser } from "../data/mockData";

const UserContext = createContext();

export function UserProvider({ children }) {
  // initial mock user — later you'll set this after login via API
  const [user, setUser] = useState(currentUser);

  // helper: returns actual image URL or fallback initials avatar
  const getProfileImage = (image, name) => {
    if (image && image.length > 0) return image;
    // use ui-avatars to create initials avatar; colors match your theme
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "User"
    )}&background=5f79b4&color=fff&size=128`;
  };

  return (
    <UserContext.Provider value={{ user, setUser, getProfileImage }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
