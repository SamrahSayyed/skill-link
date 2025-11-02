import React, { useEffect, useState } from "react";
import SidebarLeft from "../components/SidebarLeft";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ConnectionsPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [connections, setConnections] = useState([]);

  // Fetch all users from backend
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

  // Filter connections (all users except logged-in user)
  useEffect(() => {
    if (!user || allUsers.length === 0) return;
    const filtered = allUsers.filter((u) => u.id !== user.id);
    setConnections(filtered);
  }, [user, allUsers]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <SidebarLeft />

        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Your Connections</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((conn) => (
              <div
                key={conn.id}
                className="bg-white p-6 rounded-xl shadow flex flex-col items-center hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(`/profile/${conn.id}`)}
              >
                <img
                  src={conn.profileImage || "/default-avatar.png"}
                  alt={conn.username}
                  className="w-20 h-20 rounded-full mb-3"
                />
                <p className="font-medium text-lg">{conn.username}</p>
                <p className="text-sm text-gray-500">{conn.bio}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
