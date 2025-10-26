// src/components/MiniNavbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";
import { useUser } from "../context/userContext";

export default function MiniNavbar() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm sticky top-0 z-20">
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-primaryblue cursor-pointer" onClick={() => navigate("/dashboard")}>
          Skill Link
        </h1>
      </div>

      {/* Right: Create + Profile */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/create-post")}
          className="bg-primaryblue text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition"
        >
          Create Post
        </button>

        <ProfileAvatar profileImage={user.profilePic} username={user.username} size="w-10 h-10" onClick={() => navigate("/profile")} />
      </div>
    </nav>
  );
}
