// src/pages/PostCreationPage.js
import React, { useState } from "react";
import MiniNavbar from "../components/MiniNavbar";
import { useUser } from "../context/UserContext";
import { createPost } from "../api/dataService";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../components/ProfileAvatar";

export default function PostCreationPage() {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const newPost = {
        userId: user.id,
        username: user.name || user.username,
        userProfilePic: user.avatar || user.profilePic || "",
        content,
        time: new Date().toISOString(),
      };
      await createPost(newPost);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />
      <main className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="bg-white p-6 rounded shadow w-full max-w-lg">
          <div className="flex items-center gap-4 mb-4">
            <ProfileAvatar name={user.name || user.username} profileImage={user.avatar || user.profilePic} />
            <div>
              <div className="font-semibold">{user.name || user.username}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} placeholder="What's on your mind?" className="border rounded p-3 resize-none focus:outline-none" />
            <div className="flex justify-end">
              <button type="submit" disabled={loading} className="bg-primaryblue text-white px-4 py-2 rounded">
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
