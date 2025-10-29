// src/pages/DashboardPage.js
import React from "react";
import SidebarLeft from "../components/SidebarLeft";
import { useUser } from "../context/UserContext";
import { mockUsers, mockPosts } from "../data/mockData";

export default function DashboardPage() {
  const { user } = useUser();
  const connections = mockUsers.filter((u) => u.id !== user?.id);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <SidebarLeft />

        {/* Main Content */}
        <main className="flex-1 p-6 flex flex-col gap-4">
          {/* Create Post Box */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center gap-3">
              <img
                src={user?.profileImage}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-1 border rounded-full px-4 py-2"
                readOnly
              />
            </div>
          </div>

          {/* Posts Section */}
          {mockPosts.map((post) => {
            const postUser = mockUsers.find((u) => u.id === post.userId);

            if (!postUser) return null; // skip invalid posts

            return (
              <div
                key={post.id}
                className="bg-white p-4 rounded shadow flex flex-col gap-2"
              >
                {/* Post Header */}
                <div className="flex items-center gap-3">
                  <img
                    src={postUser.profileImage}
                    alt={postUser.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{postUser.name}</p>
                    <p className="text-sm text-gray-500">{postUser.role}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="text-gray-800 mt-2">{post.content}</div>
              </div>
            );
          })}
        </main>

        {/* Connections Panel */}
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
                <div>
                  <p className="text-sm font-medium">{conn.name}</p>
                  <p className="text-xs text-gray-500">{conn.role}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
