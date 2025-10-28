// src/pages/ConnectionsPage.js
import React, { useEffect, useState } from "react";
import MiniNavbar from "../components/MiniNavbar";
import { getConnections, getConnectionRequests, getUsers } from "../api/dataService";
import ProfileAvatar from "../components/ProfileAvatar";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ConnectionsPage() {
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      const [allUsers, conns, reqs] = await Promise.all([getUsers(), getConnections(), getConnectionRequests()]);
      setUsers(allUsers || []);
      // map connections to include user info
      const enriched = (conns || []).map((c) => {
        const idToShow = c.receiverId === user?.id ? c.requesterId : c.receiverId || c.connectionId;
        const u = allUsers.find((x) => x.id === idToShow) || {};
        return { ...c, name: u.name || "Unknown", avatar: u.avatar || "" };
      });
      setConnections(enriched);

      const enrichedReqs = (reqs || []).map((r) => {
        const requester = allUsers.find((u) => u.id === r.requesterId) || {};
        return { ...r, requesterUser: requester };
      });
      setRequests(enrichedReqs);
    })();
  }, [user]);

  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left - sidebar */}
          <aside className="w-80 bg-gray-50 p-4 rounded shadow">
              <div className="flex flex-col items-center justify-center gap-2">
                <ProfileAvatar name={user.name} profileImage={user.avatar || user.profilePic} size="w-32 h-32" className="font-medium text-center" />
                <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.headline || user.location || user.email}</p>
              </div>
    
              <div className="mt-6 space-y-3">
                <button onClick={() => navigate("/dashboard")} className="w-full text-left px-3 py-2 rounded hover:bg-white">Home</button>
                <button onClick={() => navigate("/connections")} className="w-full text-left px-3 py-2 rounded hover:bg-white">People</button>
                <button onClick={() => navigate("/profile")} className="w-full text-left px-3 py-2 rounded hover:bg-white">Profile</button>
              </div>
          </aside>
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Accepted Connections</h1>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Recent Connections</h3>
            <div className="space-y-3">
              {connections.length > 0 ? connections.slice(0,5).map((c) => (
                <div key={c.id} className="flex items-center gap-3 bg-white p-3 rounded shadow-sm">
                  <ProfileAvatar name={c.name} profileImage={c.avatar} />
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.status || "connected"}</div>
                  </div>
                </div>
              )) : <p className="text-sm text-gray-500">No recent connections</p>}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">All Connections</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {connections.length > 0 ? connections.map((c) => (
                <div key={c.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
                  <ProfileAvatar name={c.name} profileImage={c.avatar} />
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-gray-600">Top skills here</div>
                  </div>
                </div>
              )) : <p className="text-sm text-gray-500">No connections yet</p>}
            </div>
          </div>
        </main>

        <aside className="w-80 bg-gray-50 border-l p-4 overflow-y-auto">
          <h3 className="font-semibold mb-3">Pending Requests</h3>
          {requests.length > 0 ? requests.map((r) => (
            <div key={r.id} className="flex items-center justify-between mb-3 bg-white p-3 rounded">
              <div className="flex items-center gap-3">
                <ProfileAvatar name={r.requesterUser?.name} profileImage={r.requesterUser?.avatar} />
                <div>
                  <div className="font-medium">{r.requesterUser?.name}</div>
                  <div className="text-xs text-gray-500">Requested</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{/* placeholder for time */}</div>
            </div>
          )) : <p className="text-sm text-gray-500">No pending requests</p>}
        </aside>
      </div>
    </div>
  );
}
