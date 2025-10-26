import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MiniNavbar from "../components/MiniNavbar";
import { useUser } from "../context/UserContext";

export default function ProfilePage() {
  const { user } = useUser();
  const navigate = useNavigate();

  // Redirect to login if no user
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null; // prevent render if user is null

  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />

      <div className="flex flex-1 p-6 gap-6">
        <aside className="w-80 bg-gray-50 p-4 rounded shadow">
          <img
            src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto"
          />
          <h2 className="text-xl font-semibold text-center mt-4">{user.username}</h2>
          <p className="text-center text-gray-500">{user.email}</p>
        </aside>

        <main className="flex-1 bg-white p-6 rounded shadow overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">About Me</h3>
          <p>This is your profile page. You can add more details here later.</p>
        </main>
      </div>
    </div>
  );
}
