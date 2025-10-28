// src/components/PostCard.js
import React from "react";
import ProfileAvatar from "./ProfileAvatar";

export default function PostCard({ post }) {
  const displayName = post.displayName || post.username || post.name || "Unknown";
  const displayAvatar = post.displayAvatar || post.userProfilePic || post.avatar || "";
  const timeString = post.displayTime || post.time || post.date || new Date().toISOString();
  const when = new Date(timeString);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <ProfileAvatar name={displayName} profileImage={displayAvatar} />
        <div>
          <h3 className="font-semibold">{displayName}</h3>
          <p className="text-sm text-gray-500">{when.toLocaleString()}</p>
        </div>
      </div>

      <div className="whitespace-pre-wrap">{post.content}</div>

      <div className="flex gap-3 mt-3">
        <button className="text-sm">Like</button>
        <button className="text-sm">Comment</button>
      </div>
    </div>
  );
}
