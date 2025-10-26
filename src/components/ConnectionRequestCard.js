// src/components/ConnectionRequestCard.js
import React from "react";
import ProfileAvatar from "./ProfileAvatar";

export default function ConnectionRequestCard({ request, onAccept = () => {}, onReject = () => {} }) {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <ProfileAvatar profileImage={request.profilePic} username={request.name} size="w-10 h-10" />
        <div>
          <p className="font-medium">{request.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onAccept(request)} className="bg-primaryblue text-white px-3 py-1 rounded">Accept</button>
        <button onClick={() => onReject(request)} className="bg-gray-200 px-3 py-1 rounded">Reject</button>
      </div>
    </div>
  );
}
