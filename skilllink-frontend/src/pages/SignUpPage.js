// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import SidebarLeft from "../components/SidebarLeft";
import ProfileAvatar from "../components/ProfileAvatar";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { id } = useParams();
  const { user: currentUser, setUser } = useUser();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ bio: "", location: "" });
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [allSkills, setAllSkills] = useState([]);

  const API_URL = "http://localhost:5000/api";

  // ------------------ LOAD PROFILE ------------------
  useEffect(() => {
    if (currentUser === null) return; // still initializing
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const userId = id || currentUser.id;

    const fetchProfile = async () => {
      try {
        // Fetch user
        const userRes = await axios.get(`${API_URL}/users/${userId}`);
        setProfileUser(userRes.data);
        setEditForm({
          bio: userRes.data.bio || "",
          location: userRes.data.location || "",
        });

        // Fetch user's skills
        const skillsRes = await axios.get(`${API_URL}/user-skills/user/${userId}`);
        setSkills(skillsRes.data);

        // Fetch all skills
        const allSkillsRes = await axios.get(`${API_URL}/skills`);
        setAllSkills(allSkillsRes.data);
      } catch (err) {
        console.error("Error loading profile:", err);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, currentUser, navigate]);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!profileUser) return <div className="p-6 text-red-500">User not found.</div>;

  const isOwnProfile = currentUser?.id === profileUser?.id;

  // ------------------ HANDLERS ------------------
  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveProfile = async () => {
    try {
      const updatedUser = { ...profileUser, bio: editForm.bio, location: editForm.location };

      await axios.put(`${API_URL}/users/${profileUser.id}`, updatedUser);

      setProfileUser(updatedUser);

      if (isOwnProfile) {
        setUser(updatedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      const skillObj = allSkills.find(
        (s) => s.name.toLowerCase() === newSkill.trim().toLowerCase()
      );

      if (!skillObj) {
        alert("Skill not found. Add it in 'skills' table first.");
        return;
      }

      await axios.post(`${API_URL}/user-skills`, {
        user_id: profileUser.id,
        skill_id: skillObj.id,
        learning_type: "learn",
        level: "beginner",
      });

      setNewSkill("");
      const res = await axios.get(`${API_URL}/user-skills/user/${profileUser.id}`);
      setSkills(res.data);
    } catch (err) {
      console.error("Error adding skill:", err);
      alert("Failed to add skill");
    }
  };

  const handleDeleteSkill = async (userSkillId) => {
    try {
      await axios.delete(`${API_URL}/user-skills/${userSkillId}`);
      const res = await axios.get(`${API_URL}/user-skills/user/${profileUser.id}`);
      setSkills(res.data);
    } catch (err) {
      console.error("Error deleting skill:", err);
      alert("Failed to delete skill");
    }
  };

  // ------------------ RENDER ------------------
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
                  name={profileUser.username}
                  profileImage={profileUser.profileImage}
                  avatar={profileUser.avatar}
                  size="w-36 h-36"
                  className="mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-16 text-center">
            <h1 className="text-2xl font-semibold">{profileUser.username}</h1>
            {!isEditing ? (
              <p className="text-sm text-gray-600">{profileUser.location || "No location"}</p>
            ) : (
              <input
                type="text"
                className="mt-2 border rounded p-1 w-60 text-center"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
              />
            )}

            {/* Bio */}
            {!isEditing ? (
              <p className="mt-3 text-gray-700">{profileUser.bio || "No bio yet"}</p>
            ) : (
              <textarea
                className="mt-3 border rounded p-2 w-full max-w-md"
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              />
            )}

            {/* Skills */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.user_skill_id}
                  className="px-3 py-1 bg-gray-100 rounded-lg flex items-center gap-1"
                >
                  {skill.skill_name}
                  {isOwnProfile && isEditing && (
                    <button
                      onClick={() => handleDeleteSkill(skill.user_skill_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isOwnProfile && isEditing && (
              <div className="mt-4 flex justify-center gap-2">
                <input
                  type="text"
                  placeholder="Add new skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="border p-1 rounded"
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
            )}

            {/* Edit/Save Buttons */}
            {isOwnProfile && (
              <div className="mt-6">
                {!isEditing ? (
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
