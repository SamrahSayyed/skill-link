// src/pages/ProfilePage.js
import React from "react";
import MiniNavbar from "../components/MiniNavbar";
import SidebarLeft from "../components/SidebarLeft";
import ConnectionCard from "../components/ConnectionCard";
import { useUser } from "../context/userContext";
import { connections as mockConnections } from "../data/mockData";

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />
      <div className="flex flex-1 overflow-hidden">
        <SidebarLeft />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Backdrop + avatar */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="relative">
              <div className="h-40 bg-gradient-to-r from-primaryblue to-accentpink rounded-t-lg" />
              <div className="absolute -bottom-12 left-6">
                <img
                  src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=fff&color=5f79b4`}
                  alt="avatar"
                  className="w-28 h-28 rounded-full border-4 border-white object-cover"
                />
              </div>
            </div>

            <div className="mt-16 ml-0">
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <p className="text-gray-600">{user.location}</p>
              <p className="mt-4 text-gray-700">{user.bio}</p>
            </div>
          </div>

          {/* Top skills */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold mb-3">Top Skills</h3>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-accentpink transition hover:bg-opacity-40">React</span>
              <span className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-primaryblue transition hover:bg-opacity-40">Node</span>
              <span className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-accentpink transition hover:bg-opacity-40">SQL</span>
              <span className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-primaryblue transition hover:bg-opacity-40">Machine Learning</span>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3">Activity</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-700">• Commented on Riya's post — 2 hours ago</li>
              <li className="text-sm text-gray-700">• Posted "Learning React" — 1 day ago</li>
            </ul>
          </div>
        </main>

        {/* Right: user's connections list */}
        <aside className="w-72 bg-gray-50 border-l p-6 overflow-y-auto">
          <h4 className="font-semibold mb-3">Connections</h4>
          <div className="flex flex-col gap-3">
            {mockConnections.map((c) => (
              <ConnectionCard key={c.id} connection={c} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
