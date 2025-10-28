// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import MiniNavbar from "../components/MiniNavbar";
import { useUser } from "../context/UserContext";
import ProfileAvatar from "../components/ProfileAvatar";
import { getPosts, getConnections, getUsers } from "../api/dataService";
import { useNavigate } from "react-router-dom";


export default function ProfilePage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [connections, setConnections] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    (async () => {
      const [postsData, connsData, usersData] = await Promise.all([getPosts(), getConnections(), getUsers()]);
      setAllUsers(usersData || []);
      const myPosts = (postsData || []).filter((p) => p.userId === user.id).map(p => ({
        ...p,
        displayTime: p.time || p.date
      }));
      setPosts(myPosts);

      const enrichedConns = (connsData || []).map((c) => {
        const idToShow = c.receiverId === user.id ? c.requesterId : c.receiverId || c.connectionId;
        const u = usersData.find((x) => x.id === idToShow) || {};
        return { ...c, name: u.name || "Unknown", avatar: u.avatar || "" };
      });
      setConnections(enrichedConns);
    })();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen">
      <MiniNavbar />
      <div className="flex flex-1 p-6 gap-6">
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

        {/* Center */}
        <main className="flex-1 bg-white p-6 rounded shadow overflow-y-auto">
          <div className="relative h-40 mb-6 rounded overflow-hidden bg-gradient-to-r from-gray-200 to-gray-100">
            {/* backdrop area - can be replaced with image or gradient */}
          </div>

          <div className="flex items-start gap-6 mb-6">
            <ProfileAvatar name={user.name} profileImage={user.avatar || user.profilePic} size="w-28 h-28" />
            <div>
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <p className="text-sm text-gray-600">{user.location || user.email}</p>

              <div className="mt-4 flex gap-2 flex-wrap">
                {/* top 4 skills placeholder */}
                <span className="px-3 py-2 bg-gray-100 rounded-lg">React</span>
                <span className="px-3 py-2 bg-gray-100 rounded-lg">Node</span>
                <span className="px-3 py-2 bg-gray-100 rounded-lg">SQL</span>
                <span className="px-3 py-2 bg-gray-100 rounded-lg">ML</span>
              </div>
            </div>
          </div>

          <section>
            <h3 className="font-semibold mb-3">Activity</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {posts.length > 0 ? posts.map((p) => (
                <li key={p.id} className="bg-gray-50 p-3 rounded">
                  <div className="text-sm">{p.content}</div>
                  <div className="text-xs text-gray-400 mt-2">{new Date(p.displayTime || p.time || p.date).toLocaleString()}</div>
                </li>
              )) : <p className="text-sm text-gray-500">No recent activity</p>}
            </ul>
          </section>
        </main>

        {/* Right */}
        <aside className="w-80 bg-gray-50 p-4 rounded overflow-y-auto">
          <h3 className="font-semibold mb-3">Your Connections</h3>
          <div className="space-y-3">
            {connections.length > 0 ? connections.map((c) => (
              <div key={c.id} className="flex items-center gap-3 bg-white p-3 rounded">
                <ProfileAvatar name={c.name} profileImage={c.avatar} />
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">Top skills</div>
                </div>
              </div>
            )) : <p className="text-sm text-gray-500">No connections yet</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}
