// src/pages/DashboardPage.js
import React, { useState, useEffect } from "react";
import home from "../assets/IconsLogos/home-icon.png";
import people from "../assets/IconsLogos/people-icon.png";
import profileIcon from "../assets/IconsLogos/profile-icon.png";
import MiniNavbar from "../components/MiniNavbar";
import { useUser } from "../context/UserContext";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import {
  getPosts,
  getUsers,
  createPost,
  getConnectionRequests,
  getConnections,
  acceptConnection,
  rejectConnection,
} from "../api/dataService";
import ProfileAvatar from "../components/ProfileAvatar";

export default function DashboardPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    (async () => {
      const [usersData, postsData, reqs, conns] = await Promise.all([
        getUsers(),
        getPosts(),
        getConnectionRequests(),
        getConnections(),
      ]);
      setAllUsers(usersData || []);
      // enrich posts: attach displayName & displayAvatar & displayTime
      const enrichedPosts = (postsData || []).map((p) => {
        const author = usersData.find((u) => u.id === p.userId) || {};
        return {
          ...p,
          displayName: author.name || p.username || "Unknown",
          displayAvatar: author.avatar || p.userProfilePic || "",
          displayTime: p.time || p.date || new Date().toISOString(),
        };
      });
      setPosts(enrichedPosts);

      // enrich connection requests
      const enrichedReqs = (reqs || []).map((r) => {
        const requester = usersData.find((u) => u.id === r.requesterId) || { name: "Unknown", avatar: "" };
        return { ...r, requesterUser: requester };
      });
      setConnectionRequests(enrichedReqs);

      // enrich connections for display (if they have receiver/requester ids)
      const enrichedConns = (conns || []).map((c) => {
        // try to find a name to display; prefer receiverId then requesterId
        const idToShow = c.receiverId === user.id ? c.requesterId : c.receiverId || c.connectionId;
        const connUser = usersData.find((u) => u.id === idToShow) || {};
        return { ...c, name: connUser.name || connUser.username || "Unknown", profilePic: connUser.avatar || "" };
      });
      setConnections(enrichedConns);
    })();
  }, [user, navigate]);

  if (!user) return null;

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value.trim();
    if (!content) return;
    setPosting(true);
    try {
      const newPost = {
        userId: user.id,
        username: user.name || user.username,
        userProfilePic: user.avatar || user.profilePic || "",
        time: new Date().toISOString(),
        content,
      };
      const created = await createPost(newPost);
      // enrich created
      const displayName = user.name || user.username || "You";
      const displayAvatar = user.avatar || user.profilePic || "";
      setPosts((s) => [{ ...created, displayName, displayAvatar, displayTime: created.time }, ...s]);
      e.target.reset();
    } finally {
      setPosting(false);
    }
  };

  const handleAccept = async (req) => {
    await acceptConnection(req.id);
    setConnectionRequests((prev) => prev.filter((r) => r.id !== req.id));
    const updatedConns = await getConnections();
    // refresh connections display
    const enriched = updatedConns.map((c) => {
      const idToShow = c.receiverId === user.id ? c.requesterId : c.receiverId || c.connectionId;
      const connUser = allUsers.find((u) => u.id === idToShow) || {};
      return { ...c, name: connUser.name || "Unknown", profilePic: connUser.avatar || "" };
    });
    setConnections(enriched);
  };

  const handleReject = async (req) => {
    await rejectConnection(req.id);
    setConnectionRequests((prev) => prev.filter((r) => r.id !== req.id));
  };

  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left */}
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

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <form onSubmit={handlePostSubmit} className="flex items-center gap-3">
              <ProfileAvatar name={user.name || user.username} profileImage={user.avatar || user.profilePic} size="w-10 h-10" />
              <input name="content" className="flex-1 border rounded-full px-4 py-2 focus:outline-none" placeholder="What's on your mind?" />
              <button type="submit" disabled={posting} className="bg-primaryblue text-white px-4 py-2 rounded-full hover:bg-accentpink transition">
                {posting ? "Posting..." : "Post"}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </main>

        {/* Right */}
        <aside className="w-80 bg-gray-50 border-l p-4 overflow-y-auto space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Connection Requests</h3>
            {connectionRequests.length > 0 ? (
              connectionRequests.map((r) => (
                <div key={r.id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <ProfileAvatar name={r.requesterUser?.name} profileImage={r.requesterUser?.avatar} />
                    <span>{r.requesterUser?.name || "Unknown"}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleAccept(r)} className="bg-primaryblue text-white px-3 py-1 rounded">Accept</button>
                    <button onClick={() => handleReject(r)} className="bg-gray-200 px-3 py-1 rounded">Reject</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No requests</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Connections</h3>
            {connections.length > 0 ? (
              connections.map((c) => (
                <div key={c.id} className="flex items-center gap-2 mb-4">
                  <ProfileAvatar name={c.name} profileImage={c.profilePic} />
                  <span>{c.name}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No connections yet</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
