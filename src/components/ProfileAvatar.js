// src/components/ProfileAvatar.js
import React from "react";

/**
 * Props:
 * - name: string
 * - profileImage: string (optional)
 * - size: tailwind size classes like "w-10 h-10"
 * - className: string additional classes
 * - onClick: optional click handler
 */
export default function ProfileAvatar({ name = "", profileImage = "", size = "w-10 h-10", className = "", onClick }) {
  const trimmedName = (name || "").trim();
  const initials = trimmedName
    ? trimmedName
        .split(" ")
        .filter(Boolean)
        .map(part => part[0].toUpperCase())
        .slice(0, 2)
        .join("")
    : "U";

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt={name || "User"}
        className={`${size} rounded-full object-cover ${className}`}
        onClick={onClick}
      />
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${size} rounded-full flex items-center justify-center bg-gray-300 text-gray-800 font-semibold ${className}`}
      title={name || "User"}
    >
      {initials}
    </div>
  );
}
