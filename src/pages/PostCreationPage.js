// src/pages/PostCreationPage.js
import React from "react";
import MiniNavbar from "../components/MiniNavbar";
import SidebarLeft from "../components/SidebarLeft";
import { useUser } from "../context/userContext";

export default function PostCreationPage() {
  const { user } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value.trim();
    if (!content) return;
    // FUTURE: POST /posts -> backend
    alert("Post created (mock): " + content);
    e.target.reset();
  };

  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />
      <div className="flex flex-1 overflow-hidden">
        <SidebarLeft />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <img src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`} alt="me" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <textarea name="content" rows="6" placeholder="What's on your mind?" className="border rounded-lg p-3 focus:outline-none"></textarea>
                    <button type="submit" className="bg-primaryblue text-white px-4 py-2 rounded-full">Post</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="w-72 bg-gray-50 border-l p-6 overflow-y-auto">
          <h4 className="font-semibold mb-3">Tips</h4>
          <p className="text-sm text-gray-600">Use this space to share updates, links, and projects.</p>
        </aside>
      </div>
    </div>
  );
}
