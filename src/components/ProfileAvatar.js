// src/components/ProfileAvatar.js
import React from "react";
import { useUser } from "../context/UserContext";

export default function ProfileAvatar({ profileImage, username, size = "w-10 h-10", onClick }) {
  const { getProfileImage } = useUser();
  const src = getProfileImage(profileImage, username);

  return (
    <img
      src={src}
      alt={`${username || "User"} avatar`}
      onClick={onClick}
      className={`${size} rounded-full object-cover cursor-pointer`}
    />
  );
}
