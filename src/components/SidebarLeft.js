// src/components/SidebarLeft.js
import React from "react";
import { Link } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";
import { useUser } from "../context/userContext";

export default function SidebarLeft() {
  const { user } = useUser();

  return (
    <aside className="w-72 bg-gray-50 border-r p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <ProfileAvatar profileImage={user.profilePic} username={user.username} size="w-16 h-16" />
        <div>
          <h3 className="font-semibold text-maintextblack">{user.username}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-gray-100">Home</Link>
        <Link to="/connections" className="px-3 py-2 rounded hover:bg-gray-100">People</Link>
        <Link to="/profile" className="px-3 py-2 rounded hover:bg-gray-100">Profile</Link>
      </nav>

      <div className="mt-auto text-xs text-gray-500">
        © 2025 Your Name
      </div>
    </aside>
  );
}
