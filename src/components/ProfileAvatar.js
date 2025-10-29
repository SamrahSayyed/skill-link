// src/components/ProfileAvatar.js
import React from "react";

/**
 * ProfileAvatar
 * props:
 *  - name (string) used to generate initials
 *  - profileImage (string) optional image url (explicit profile image)
 *  - avatar (string) fallback image url (e.g. randomuser avatar)
 *  - size (string) tailwind classes like "w-10 h-10"
 *  - className (string)
 *  - onClick
 */
export default function ProfileAvatar({
  name = "",
  profileImage = "",
  avatar = "",
  size = "w-10 h-10",
  className = "",
  onClick,
}) {
  const cleaned = (name || "").trim();
  const initials = cleaned
    ? cleaned
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0].toUpperCase())
        .slice(0, 2)
        .join("")
    : "U";

  const imageToShow = profileImage || avatar || "";

  if (imageToShow) {
    return (
      <img
        src={imageToShow}
        alt={name || "User"}
        className={`${size} rounded-full object-cover ${className}`}
        onClick={onClick}
      />
    );
  }

  return (
    <div
      onClick={onClick}
      title={name || "User"}
      className={`${size} rounded-full flex items-center justify-center bg-gray-200 text-gray-800 font-semibold ${className}`}
    >
      {initials}
    </div>
  );
}
