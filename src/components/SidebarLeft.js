// src/components/SidebarLeft.js
import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";
import { useUser } from "../context/UserContext";

export default function SidebarLeft() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <aside className="flex flex-col w-60 bg-gray-50 p-4 gap-6">
      <div className="flex flex-col items-center bg-white p-4 rounded shadow">
        <ProfileAvatar
          name={user?.name}
          profileImage={user?.profilePic}
          size="w-20 h-20"
        />
        <h2 className="font-semibold text-lg mt-3">{user?.name}</h2>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <div className="flex flex-col gap-2 bg-white p-4 rounded shadow">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-left hover:text-primaryblue flex items-center gap-3"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/connections")}
          className="text-left hover:text-primaryblue flex items-center gap-3"
        >
          People
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="text-left hover:text-primaryblue flex items-center gap-3"
        >
          Profile
        </button>
      </div>
    </aside>
  );
}
