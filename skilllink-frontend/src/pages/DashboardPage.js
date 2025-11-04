import React, { useEffect, useState } from "react";
import SidebarLeft from "../components/SidebarLeft";
import PostCard from "../components/PostCard";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function DashboardPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]); // all users from backend
  const [posts, setPosts] = useState([]);

  const location = useLocation();

useEffect(() => {
  if (location.state?.newPost) {
    setPosts((prev) => [location.state.newPost, ...prev]);
  }
}, [location.state]);


  // ----------------------
  // Fetch all users
  // ----------------------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users`);
        const data = await res.json();
        setAllUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // ----------------------
// Fetch all posts
// ----------------------
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`);
      const data = await res.json();
      console.log("Fetched posts:", data); // 👈 Check what backend returns

      // ✅ FIX: Ensure posts is always an array
      if (Array.isArray(data)) {
        setPosts(data);
      } else if (Array.isArray(data.posts)) {
        setPosts(data.posts);
      } else {
        setPosts([]); // fallback if format unexpected
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]); // ensure posts always an array
    }
  };
  fetchPosts();
}, []);


  // ----------------------
  // Map posts to user info
  // ----------------------
  const postsWithUser = posts.map((p) => {
    const postUser = allUsers.find((u) => u.id === p.user_id);
    return { ...p, user: postUser }; // attach user object to post
  });

  // ----------------------
  // Connections (all users except logged-in)
  // ----------------------
  const connections = allUsers.filter((u) => u.id !== user?.id);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <SidebarLeft />

        <main className="flex-1 p-6 flex flex-col gap-4">
          {/* Create Post Section */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center gap-3">
              <img
                src={user?.profileImage || "/default-avatar.png"}
                alt={user?.username}
                className="w-10 h-10 rounded-full"
              />
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-1 border rounded-full px-4 py-2 cursor-pointer"
                onClick={() => navigate("/create-post")}
                readOnly
              />
              <button
                onClick={() => navigate("/create-post")}
                className="bg-primaryblue text-white px-4 py-2 rounded-full hover:bg-accentpink transition"
              >
                Create Post
              </button>
            </div>
          </div>

          {/* Posts Feed */}
{Array.isArray(postsWithUser) && postsWithUser.length > 0 ? (
  postsWithUser.map((post) => <PostCard key={post.id} post={post} />)
) : (
  <p className="text-gray-500 text-center mt-4">No posts yet.</p>
)}

        </main>

        {/* Connections Section */}
        <aside className="w-64 bg-white p-4 shadow-lg rounded-lg m-4">
          <h3 className="font-semibold text-lg mb-3">Connections</h3>
          <div className="flex flex-col gap-3">
            {connections.map((conn) => (
              <div key={conn.id} className="flex items-center gap-3">
                <img
                  src={conn.profileImage || "/default-avatar.png"}
                  alt={conn.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{conn.username}</p>
                  <p className="text-xs text-gray-500">{conn.role || "Member"}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
