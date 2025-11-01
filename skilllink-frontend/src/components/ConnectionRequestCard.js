// src/components/ConnectionRequestCard.js
import React from "react";
import ProfileAvatar from "./ProfileAvatar";

export default function ConnectionRequestCard({ request, onAccept = () => {}, onReject = () => {} }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className="flex flex-row items-center gap-2 md:my-[20px]">
        <ProfileAvatar profileImage={request.profilePic} username={request.name} size="w-10 h-10" />
        <div>
          <p className="font-medium">{request.name}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
       <div className="flex flex-row items-center gap-5 justify-between">
         <button onClick={() => onAccept(request)} className="bg-primaryblue text-white px-3 py-1 rounded hover:bg-accentpink transition">Accept</button>
        <button onClick={() => onReject(request)} className="bg-gray-200 px-3 py-1 rounded">Reject</button>
       </div>
      </div>
    </div>
  );
}
