import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // ✅ fixed casing

export default function MiniNavbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-primaryblue via-gradientmid to-accentpink shadow-sm sticky top-0 z-20">
      <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate("/dashboard")}>
        Skill Link
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/create-post")}
          className="bg-white text-accentpink hover:bg-primaryblue hover:text-white px-4 py-2 rounded-full font-medium transition"
        >
          Create Post
        </button>

        {user && (
          <>
            <img
              src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => navigate("/profile")}
            />
            <button onClick={handleLogout} className="text-red-500 font-semibold hover:underline">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
