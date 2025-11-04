import React, { useState } from "react";
import MiniNavbar from "../components/MiniNavbar";
import SidebarLeft from "../components/SidebarLeft";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";

export default function PostCreationPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, {
        user_id: user.id,
        content,
      });

      console.log("Post created successfully:", res.data);

      // Go back to dashboard with the new post data
      navigate("/dashboard", { state: { newPost: res.data } });
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <MiniNavbar />

      <div className="flex flex-1">
        <SidebarLeft />

        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Create a New Post
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea
                className="border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primaryblue text-white py-2 px-4 rounded-lg hover:bg-accentpink transition disabled:opacity-50"
                >
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
