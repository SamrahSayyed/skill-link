import React from "react";
import MiniNavbar from "../components/MiniNavbar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MiniNavbar />
      <main className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-maintextblack mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["My Projects","My Connections","Recent Activity"].map((card,i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-semibold mb-2">{card}</h2>
              <p>Content for {card.toLowerCase()} goes here.</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
