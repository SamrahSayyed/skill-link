// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import SidebarLeft from "../components/SidebarLeft";
import ProfileAvatar from "../components/ProfileAvatar";
import { useUser } from "../context/UserContext";
import { mockUsers, mockPosts } from "../data/mockData";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // User's own posts
    const myPostsData = mockPosts
      .filter((p) => p.userId === user.id)
      .map((p) => ({
        ...p,
        displayTime: p.time || p.timestamp || p.date,
      }));
    setMyPosts(myPostsData);

    // All connections except self
    const myConnections = mockUsers.filter((u) => u.id !== user.id);
    setConnections(myConnections);
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 p-6 gap-6">
        <SidebarLeft />

        {/* Main Profile Section */}
        <main className="flex-1 bg-white p-6 rounded-2xl shadow overflow-y-auto">
          {/* Cover + Avatar */}
          <div className="relative mb-6">
            <div className="h-40 rounded overflow-hidden bg-gradient-to-r from-gray-200 to-gray-100"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
              <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden bg-white">
                <ProfileAvatar
                  name={user.name}
                  profileImage={user.profileImage}
                  avatar={user.avatar}
                  size="w-36 h-36"
                  className="mx-auto"
                />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="pt-16 text-center">
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-sm text-gray-600">
              {user.location || user.email}
            </p>

            {/* Skills */}
            <div className="mt-4 flex gap-2 items-center justify-center flex-wrap">
              <span className="px-3 py-2 bg-gray-100 rounded-lg">React</span>
              <span className="px-3 py-2 bg-gray-100 rounded-lg">Node</span>
              <span className="px-3 py-2 bg-gray-100 rounded-lg">SQL</span>
              <span className="px-3 py-2 bg-gray-100 rounded-lg">ML</span>
            </div>

            {/* Activity Section */}
            <section className="mt-6">
              <h3 className="font-semibold mb-3">Activity</h3>
              <div className="space-y-3">
                {myPosts.length > 0 ? (
                  myPosts.map((p) => (
                    <div key={p.id} className="bg-gray-50 p-3 rounded">
                      <div className="text-sm">{p.content}</div>
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(p.displayTime).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No recent activity</p>
                )}
              </div>
            </section>
          </div>
        </main>

        {/* ✅ Connections Panel — identical to DashboardPage */}
        <aside className="w-64 bg-white p-4 shadow-lg rounded-lg m-4">
          <h3 className="font-semibold text-lg mb-3">Connections</h3>
          <div className="flex flex-col gap-3">
            {connections.map((conn) => (
              <div key={conn.id} className="flex items-center gap-3">
                <img
                  src={conn.profileImage}
                  alt={conn.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-sm">{conn.name}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
