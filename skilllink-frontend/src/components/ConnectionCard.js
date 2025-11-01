// src/components/ConnectionCard.js
import React from "react";
import ProfileAvatar from "./ProfileAvatar";

export default function ConnectionCard({ connection }) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
      <ProfileAvatar profileImage={connection.profilePic} username={connection.name} size="w-10 h-10" />
      <div className="flex-1">
        <p className="font-medium">{connection.name}</p>
        <p className="text-sm text-gray-500">Top skills • 4</p>
      </div>
    </div>
  );
}
