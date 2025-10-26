// src/components/PostCard.js
import React, { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <ProfileAvatar profileImage={post.userProfilePic} username={post.username} size="w-10 h-10" />
        <div>
          <div className="font-semibold">{post.username}</div>
          <div className="text-xs text-gray-500">{new Date(post.time).toLocaleString()}</div>
        </div>
      </div>

      <p className="mb-3">{post.content}</p>

      <div className="flex items-center gap-4 text-sm">
        <button onClick={() => setLiked(!liked)} className={`px-2 py-1 rounded ${liked ? "text-red-600" : "text-gray-600"}`}>
          {liked ? "♥ Liked" : "♡ Like"}
        </button>
        <button className="text-gray-600">Comment</button>
      </div>
    </div>
  );
}
