// src/pages/ConnectionsPage.js
import React from "react";
import SidebarLeft from "../components/SidebarLeft";
import MiniNavbar from "../components/MiniNavbar";
import { mockUsers } from "../data/mockData";
import { useUser } from "../context/UserContext";

export default function ConnectionsPage() {
  const { user } = useUser();

  // Filter out the logged-in user from the connections list
  const connections = mockUsers.filter((u) => u.id !== user?.id);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* ✅ Left Sidebar */}
        <SidebarLeft />

        {/* ✅ Main Content Area */}
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Your Connections</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((conn) => (
              <div
                key={conn.id}
                className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:shadow-md transition"
              >
                <img
                  src={conn.profileImage}
                  alt={conn.name}
                  className="w-20 h-20 rounded-full mb-3"
                />
                <p className="font-medium text-lg">{conn.name}</p>
                <p className="text-sm text-gray-500">{conn.role}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
