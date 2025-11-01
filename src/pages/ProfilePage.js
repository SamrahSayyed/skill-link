// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import SidebarLeft from "../components/SidebarLeft";
import ProfileAvatar from "../components/ProfileAvatar";
import { useUser } from "../context/UserContext";
import { mockUsers, mockPosts } from "../data/mockData";
import { useParams, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { id } = useParams(); // Get the user id from URL
  const { user: currentUser } = useUser();
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // If id param exists, show that user's profile; else show current user
    const userToShow = id ? mockUsers.find((u) => u.id === parseInt(id)) : currentUser;

    if (!userToShow) {
      navigate("/dashboard");
      return;
    }

    setProfileUser(userToShow);

    // User posts
    const postsData = mockPosts
      .filter((p) => p.userId === userToShow.id)
      .map((p) => ({ ...p, displayTime: p.time || p.timestamp || p.date }));
    setMyPosts(postsData);
  }, [id, currentUser, navigate]);

  if (!profileUser) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 p-6 gap-6">
        <SidebarLeft />

        <main className="flex-1 bg-white p-6 rounded-2xl shadow overflow-y-auto">
         
  {/* Back Button */}
  <div className="mb-4 text-left">
    <button
      onClick={() => navigate("/connections")}
      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
    >
      &larr; Back to Connections
    </button>
  </div>

  {/* Cover + Avatar */}
  <div className="relative mb-6">
    <div className="h-40 rounded overflow-hidden bg-gradient-to-r from-gray-200 to-gray-100"></div>
    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
      <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden bg-white">
        <ProfileAvatar
          name={profileUser.name}
          profileImage={profileUser.profileImage}
          avatar={profileUser.avatar}
          size="w-36 h-36"
          className="mx-auto"
        />
      </div>
    </div>
  </div>

  
        

          <div className="pt-16 text-center">
            <h1 className="text-2xl font-semibold">{profileUser.name}</h1>
            <p className="text-sm text-gray-600">{profileUser.location || profileUser.email}</p>

            <div className="mt-4 flex gap-2 items-center justify-center flex-wrap">
              {profileUser.skills?.map((skill, idx) => (
                <span key={idx} className="px-3 py-2 bg-gray-100 rounded-lg">
                  {skill}
                </span>
              ))}
            </div>

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
      </div>
    </div>
  );
}
