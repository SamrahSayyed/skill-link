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
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ bio: "", location: "" });
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [allSkills, setAllSkills] = useState([]);
  const [newSkillType, setNewSkillType] = useState("learn");
  const [newSkillLevel, setNewSkillLevel] = useState("beginner");

  const API_URL = "http://localhost:5000/api";

  // ------------------ LOAD PROFILE ------------------
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const userId = id || currentUser.id;

    // fetch user
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((res) => {
        setProfileUser(res.data);
        setEditForm({
          bio: res.data.bio || "",
          location: res.data.location || "",
        });
      })
      .catch((err) => console.error("Error loading profile:", err));

    // fetch user's skills
    fetchSkills(userId);

    // fetch all skills
    axios
      .get(`${API_URL}/skills`)
      .then((res) => setAllSkills(res.data))
      .catch((err) => console.error("Error loading skills:", err));
  }, [id, currentUser, navigate]);

  const fetchSkills = (userId) => {
    axios
      .get(`${API_URL}/user-skills/user/${userId}`)
      .then((res) => {
        const mappedSkills = res.data.map((s) => ({
          user_skill_id: s.id,
          skill_id: s.skill_id,
          skill_name: s.skill_name,
          type: s.type, // DB column 'type' (learn/teach)
          experience_level: s.experience_level, // DB column 'experience_level'
          created_at: s.created_at,
        }));
        setSkills(mappedSkills);
      })
      .catch((err) => console.error("Error fetching skills:", err));
  };

  if (!profileUser) return null;

  const isOwnProfile = currentUser?.id === profileUser?.id;

  // ------------------ HANDLERS ------------------
  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveProfile = async () => {
    try {
      await axios.put(`${API_URL}/users/${profileUser.id}`, {
        ...profileUser,
        bio: editForm.bio,
        location: editForm.location,
      });

      const updatedUser = { ...profileUser, bio: editForm.bio, location: editForm.location };
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

    const skillObj = allSkills.find((s) => s.name.toLowerCase() === newSkill.toLowerCase());
    if (!skillObj) {
      alert("Skill not found. Add it to the 'skills' table first.");
      return;
    }

    const alreadyAdded = skills.some((s) => s.skill_id === skillObj.id);
    if (alreadyAdded) {
      alert("You already have this skill.");
      return;
    }

    try {
      await axios.post(`${API_URL}/user-skills`, {
        user_id: profileUser.id,
        skill_id: skillObj.id,
        type: newSkillType,
        experience_level: newSkillLevel,
      });

      setNewSkill("");
      setNewSkillType("learn");
      setNewSkillLevel("beginner");

      fetchSkills(profileUser.id);
    } catch (err) {
      console.error("Error adding skill:", err);
      alert("Failed to add skill.");
    }
  };

  const handleDeleteSkill = async (userSkillId) => {
    try {
      await axios.delete(`${API_URL}/user-skills/${userSkillId}`);
      fetchSkills(profileUser.id);
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const handleSkillUpdate = async (userSkillId, key, value) => {
    const skill = skills.find((s) => s.user_skill_id === userSkillId);
    if (!skill) return;

    try {
      await axios.put(`${API_URL}/user-skills/${userSkillId}`, {
        type: key === "type" ? value : skill.type,
        experience_level: key === "experience_level" ? value : skill.experience_level,
      });

      setSkills((prev) =>
        prev.map((s) =>
          s.user_skill_id === userSkillId ? { ...s, [key]: value } : s
        )
      );
    } catch (err) {
      console.error("Error updating skill:", err);
      alert("Failed to update skill.");
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
                placeholder="Add Location"
                className="mt-2 border rounded p-1 w-60 text-center"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
              />
            )}

            {!isEditing ? (
              <p className="mt-3 text-gray-700">{profileUser.bio || "No bio yet"}</p>
            ) : (
              <div><textarea
                placeholder="Add Bio"
                className="mt-3 border rounded p-2 w-full max-w-md"
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              /></div>
            )}

            {/* -------------------- Skills Section -------------------- */}
            <div className="mt-4 flex flex-col items-center gap-3">
              {/* Existing Skills */}
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill.user_skill_id}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg"
                  >
                    <span>{skill.skill_name}</span>

                    {isEditing && (
                      <>
                        <select
                          value={skill.experience_level}
                          onChange={(e) =>
                            handleSkillUpdate(skill.user_skill_id, "experience_level", e.target.value)
                          }
                          className="border rounded p-1 text-sm"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>

                        <select
                          value={skill.type}
                          onChange={(e) =>
                            handleSkillUpdate(skill.user_skill_id, "type", e.target.value)
                          }
                          className="border rounded p-1 text-sm"
                        >
                          <option value="learn">Learn</option>
                          <option value="teach">Teach</option>
                        </select>

                        <button
                          onClick={() => handleDeleteSkill(skill.user_skill_id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </>
                    )}

                    {!isEditing && <span>({skill.experience_level}, {skill.type})</span>}
                  </div>
                ))}
              </div>

              {/* Add New Skill */}
              {isOwnProfile && isEditing && (
                <div className="mt-2 flex flex-wrap justify-center gap-2 items-center">
                  <input
                    type="text"
                    placeholder="New skill name..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="border p-1 rounded"
                  />

                  <select
                    value={newSkillType}
                    onChange={(e) => setNewSkillType(e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="learn">Learn</option>
                    <option value="teach">Teach</option>
                  </select>

                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>

                  <button
                    onClick={handleAddSkill}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

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
