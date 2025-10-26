// src/pages/ConnectionsPage.js
import React from "react";
import MiniNavbar from "../components/MiniNavbar";
import SidebarLeft from "../components/SidebarLeft";
import ConnectionCard from "../components/ConnectionCard";
import { connections as mockConnections } from "../data/mockData";

export default function ConnectionsPage() {
  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />
      <div className="flex flex-1 overflow-hidden">
        <SidebarLeft />

        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Accepted Requests & Connections</h1>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold mb-3">Latest Accepted</h3>
            <p className="text-sm text-gray-600">You accepted a request from Riya — 3 hours ago</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockConnections.map((c) => <ConnectionCard key={c.id} connection={c} />)}
          </div>
        </main>

        <aside className="w-72 bg-gray-50 border-l p-6 overflow-y-auto">
          <h4 className="font-semibold mb-3">Pending Requests</h4>
          <p className="text-sm text-gray-500">No pending requests</p>
        </aside>
      </div>
    </div>
  );
}
