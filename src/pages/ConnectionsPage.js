import React from "react";
import home from "../assets/IconsLogos/home-icon.png";
import people from "../assets/IconsLogos/people-icon.png";
import profile from "../assets/IconsLogos/profile-icon.png";
import MiniNavbar from "../components/MiniNavbar";
import { connections as mockConnections } from "../data/mockData";

export default function ConnectionsPage() {
  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="flex flex-col w-60 bg-gray-50 p-4 gap-6">
          <div className="flex flex-col gap-2 bg-white p-4 rounded shadow">
            <button className="text-left hover:text-primaryblue flex flex-row items-center gap-3" onClick={() => window.location.href="/dashboard"}><img src={home} className="w-5 h-5"></img>Home</button>
            <button className="text-left hover:text-primaryblue flex flex-row items-center gap-3" onClick={() => window.location.href="/connections"}><img src={people} className="w-6 h-6"></img>People</button>
            <button className="text-left hover:text-primaryblue flex flex-row items-center gap-3" onClick={() => window.location.href="/profile"}><img src={profile} className="w-6 h-6"></img>Profile</button>
          </div>
        </aside>

        {/* Center */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <h1 className="text-2xl font-semibold mb-4">Accepted Requests & Connections</h1>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold mb-3">Latest Accepted</h3>
            <p className="text-sm text-gray-600">You accepted a request from Riya — 3 hours ago</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockConnections.map(c => (
              <div key={c.id} className="flex items-center gap-3 bg-white p-4 rounded shadow">
                <img
                  src={c.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}`}
                  alt={c.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-sm text-gray-500">Top Skills: React, Node, SQL</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-72 bg-gray-50 border-l p-6 overflow-y-auto space-y-3">
          <h4 className="font-semibold mb-3">Pending Requests</h4>
          <p className="text-sm text-gray-500">No pending requests</p>
        </aside>
      </div>
    </div>
  );
}
