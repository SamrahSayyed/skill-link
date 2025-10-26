// src/pages/DashboardPage.js
import React, { useState } from "react";
import MiniNavbar from "../components/MiniNavbar";
import SidebarLeft from "../components/SidebarLeft";
import ConnectionRequestCard from "../components/ConnectionRequestCard";
import ConnectionCard from "../components/ConnectionCard";
import PostCard from "../components/PostCard";

import { connectionRequests as mockRequests, connections as mockConnections, posts as mockPosts } from "../data/mockData";
import { useUser } from "../context/userContext";

export default function DashboardPage() {
  // local state for requests/connections/posts (mock)
  const [requests, setRequests] = useState(mockRequests);
  const [conns, setConns] = useState(mockConnections);
  const [posts] = useState(mockPosts);

  const { user } = useUser();

  // accept request: move to connections
  const handleAccept = (req) => {
    setConns((s) => [...s, { id: req.id, name: req.name, profilePic: req.profilePic }]);
    setRequests((s) => s.filter((r) => r.id !== req.id));
    // FUTURE: call POST /connections in backend
  };

  const handleReject = (req) => {
    setRequests((s) => s.filter((r) => r.id !== req.id));
    // FUTURE: call DELETE /requests/:id in backend
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value.trim();
    if (!content) return;
    // add to top of posts locally
    // In real app we call POST /posts and refresh feed
    const newPost = {
      id: Math.floor(Math.random() * 100000),
      userId: user.id,
      username: user.username,
      userProfilePic: user.profilePic,
      time: new Date().toISOString(),
      content
    };
    // show new post at top
    posts.unshift(newPost); // since posts is const from mock, for demo you might use state; here keep simple
    e.target.reset();
    window.location.reload(); // quick way to show new post in demo - replace with useState in production
  };

  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left */}
        <SidebarLeft />

        {/* Center (scrollable) */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Post creation box */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <form onSubmit={handlePostSubmit} className="flex items-center gap-3">
              <img src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`} alt="me" className="w-10 h-10 rounded-full" />
              <input name="content" className="flex-1 border rounded-full px-4 py-2 focus:outline-none" placeholder="What's on your mind?" />
              <button type="submit" className="bg-primaryblue text-white px-4 py-2 rounded-full">Post</button>
            </form>
          </div>

          {/* Posts feed */}
          <div className="space-y-4">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </main>

        {/* Right */}
        <aside className="w-72 bg-gray-50 border-l p-6 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Connection Requests</h3>
            <div className="flex flex-col gap-3">
              {requests.map((r) => (
                <ConnectionRequestCard key={r.id} request={r} onAccept={handleAccept} onReject={handleReject} />
              ))}
              {requests.length === 0 && <p className="text-sm text-gray-500">No requests</p>}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Your Connections</h3>
            <div className="flex flex-col gap-3">
              {conns.map((c) => (
                <ConnectionCard key={c.id} connection={c} />
              ))}
              {conns.length === 0 && <p className="text-sm text-gray-500">No connections yet</p>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
