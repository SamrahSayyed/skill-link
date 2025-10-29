// src/components/PostCard.js
import React from "react";
import ProfileAvatar from "./ProfileAvatar";

export default function PostCard({ post }) {
  // Post expected to have: displayName, displayAvatar, displayTime, content
  const displayName = post.displayName || post.user?.name || post.user?.username || "Unknown";
  const displayAvatar = post.displayAvatar || post.user?.avatar || post.user?.profilePic || "";
  const time = new Date(post.displayTime || post.timestamp || post.time || Date.now());

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <ProfileAvatar name={displayName} profileImage={displayAvatar} size="w-12 h-12" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{displayName}</div>
              <div className="text-xs text-gray-500">{time.toLocaleString()}</div>
            </div>
          </div>
          <div className="mt-3 text-gray-800 whitespace-pre-wrap">{post.content}</div>
          <div className="flex gap-4 mt-4 text-sm text-gray-600">
            <button className="hover:text-primaryblue">Like</button>
            <button className="hover:text-primaryblue">Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
