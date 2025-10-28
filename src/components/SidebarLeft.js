// src/components/SidebarLeft.js
import React from "react";
import { useNavigate } from "react-router-dom";
import home from "../assets/IconsLogos/home-icon.png";
import people from "../assets/IconsLogos/people-icon.png";
import profile from "../assets/IconsLogos/profile-icon.png";

export default function SidebarLeft() {
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col w-60 bg-gray-50 p-4 gap-6">
      <div className="flex flex-col items-center bg-white p-4 rounded shadow">
        {/* placeholder - Profile shown in page instead */}
        <div className="w-20 h-20 rounded-full bg-gray-200" />
        <h2 className="font-semibold text-lg mt-3">User</h2>
      </div>

      <div className="flex flex-col gap-2 bg-white p-4 rounded shadow">
        <button onClick={() => navigate("/dashboard")} className="text-left hover:text-primaryblue flex items-center gap-3"><img src={home} className="w-5 h-5" alt="home" /> Home</button>
        <button onClick={() => navigate("/connections")} className="text-left hover:text-primaryblue flex items-center gap-3"><img src={people} className="w-6 h-6" alt="people" /> People</button>
        <button onClick={() => navigate("/profile")} className="text-left hover:text-primaryblue flex items-center gap-3"><img src={profile} className="w-6 h-6" alt="profile" /> Profile</button>
      </div>
    </aside>
  );
}
