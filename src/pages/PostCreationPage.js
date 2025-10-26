import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MiniNavbar from "../components/MiniNavbar";
import { useUser } from "../context/UserContext";

export default function PostCreationPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null; // do not render if no user

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value.trim();
    if (!content) return;
    console.log("Post submitted by", user.username, ":", content);
    e.target.reset();
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />
      <main className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <form onSubmit={handlePostSubmit} className="bg-white p-6 rounded shadow w-full max-w-lg flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center">Create Post</h2>
          <textarea
            name="content"
            placeholder="What's on your mind?"
            className="border rounded-lg p-3 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primaryblue"
            required
          ></textarea>
          <button type="submit" className="bg-primaryblue text-white py-3 rounded-lg hover:bg-accentpink transition">
            Post
          </button>
        </form>
      </main>
    </div>
  );
}
