// src/components/MiniNavbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function MiniNavbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // If no user present, show minimal bar to avoid blank area
  if (!user) {
    return (
      <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-primaryblue to-accentpink text-white">
        <div className="text-lg font-bold">Skill Link</div>
        <div>
          <button onClick={() => navigate("/login")} className="bg-white text-accentpink px-3 py-1 rounded-full">Login</button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-primaryblue to-accentpink text-white sticky top-0 z-20">
      <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>Skill Link</div>

      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/create-post")} className="bg-white text-accentpink px-4 py-2 rounded-full">Create Post</button>

        <img
          src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || "User")}`}
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => navigate("/profile")}
        />

        <button onClick={() => { logout(); navigate("/login"); }} className="text-white/90 hover:underline">Logout</button>
      </div>
    </nav>
  );
}
