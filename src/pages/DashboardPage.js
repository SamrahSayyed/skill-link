import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import home from "../assets/IconsLogos/home-icon.png";
import people from "../assets/IconsLogos/people-icon.png";
import profile from "../assets/IconsLogos/profile-icon.png";
import MiniNavbar from "../components/MiniNavbar";
import { useUser } from "../context/UserContext";
import { connectionRequests as mockRequests, connections as mockConnections, posts as mockPosts } from "../data/mockData";

export default function DashboardPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const [requests, setRequests] = useState(mockRequests);
  const [conns, setConns] = useState(mockConnections);
  const [posts, setPosts] = useState(mockPosts);

  const handleAccept = (req) => {
    setConns((s) => [...s, { id: req.id, name: req.name, profilePic: req.profilePic }]);
    setRequests((s) => s.filter((r) => r.id !== req.id));
  };

  const handleReject = (req) => {
    setRequests((s) => s.filter((r) => r.id !== req.id));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!user) return; // safety
    const content = e.target.elements.content.value.trim();
    if (!content) return;
    const newPost = {
      id: Math.floor(Math.random() * 100000),
      userId: user.id,
      username: user.username,
      userProfilePic: user.profilePic,
      time: new Date().toISOString(),
      content
    };
    setPosts((s) => [newPost, ...s]);
    e.target.reset();
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="flex flex-col w-60 bg-gray-50 p-4 gap-6">
          <div className="flex flex-col items-center bg-white p-4 rounded shadow">
            <img src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`} alt="me" className="w-20 h-20 rounded-full mb-2" />
            <h2 className="font-semibold text-lg">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          {/* Navigation Buttons */}
          <div className="flex flex-col gap-2 bg-white p-4 rounded shadow">
            <button className="text-left hover:text-primaryblue flex items-center gap-3" onClick={() => navigate("/dashboard")}><img src={home} className="w-5 h-5" />Home</button>
            <button className="text-left hover:text-primaryblue flex items-center gap-3" onClick={() => navigate("/connections")}><img src={people} className="w-6 h-6" />People</button>
            <button className="text-left hover:text-primaryblue flex items-center gap-3" onClick={() => navigate("/profile")}><img src={profile} className="w-6 h-6" />Profile</button>
          </div>
        </aside>

        {/* Center */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Post Box */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <form onSubmit={handlePostSubmit} className="flex items-center gap-3">
              <img src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`} alt="me" className="w-10 h-10 rounded-full" />
              <input name="content" className="flex-1 border rounded-full px-4 py-2 focus:outline-none" placeholder="What's on your mind?" />
              <button type="submit" className="bg-primaryblue text-white px-4 py-2 rounded-full hover:bg-accentpink transition">Post</button>
            </form>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <img src={p.userProfilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.username)}`} alt={p.username} className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="font-semibold">{p.username}</h3>
                    <p className="text-sm text-gray-500">{new Date(p.time).toLocaleString()}</p>
                  </div>
                </div>
                <p>{p.content}</p>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 bg-gray-50 border-l p-4 overflow-y-auto space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Connection Requests</h3>
            {requests.length > 0 ? requests.map(r => (
              <div key={r.id} className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <img src={r.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}`} alt={r.name} className="w-10 h-10 rounded-full" />
                  <span className="gap-5">{r.name}</span>
                </div>
                <div className="flex gap-2">
                  <button className="bg-primaryblue text-white px-3 py-1 rounded hover:bg-accentpink transition" onClick={() => handleAccept(r)}>Accept</button>
                  <button className="bg-gray-200 px-3 py-1 rounded" onClick={() => handleReject(r)}>Reject</button>
                </div>
              </div>
            )) : <p className="text-sm text-gray-500">No requests</p>}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Connections</h3>
            {conns.length > 0 ? conns.map(c => (
              <div key={c.id} className="flex items-center gap-2 mb-5">
                <img src={c.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}`} alt={c.name} className="w-10 h-10 rounded-full" />
                <span>{c.name}</span>
              </div>
            )) : <p className="text-sm text-gray-500">No connections yet</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}
