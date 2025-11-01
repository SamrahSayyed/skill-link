// src/components/MiniNavbar.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function MiniNavbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation(); // to check current route

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <Link to="/dashboard" className="text-xl font-semibold text-gray-800">
        SkillLink
      </Link>

      {user && (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {/* ✅ Hide Create Post button only on Post Creation page */}
            {location.pathname !== "/create-post" && (
              <button
                onClick={() => navigate("/create-post")}
                className="bg-primaryblue text-white px-4 py-2 rounded-lg hover:bg-accentpink transition"
              >
                Create Post
              </button>
            )}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Logout
            </button>
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
