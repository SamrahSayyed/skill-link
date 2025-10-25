import React from "react";
import { Link } from "react-router-dom";

export default function MiniNavbar() {
  return (
    <div className="flex justify-end items-center p-4 bg-white shadow-md">
      {/* Create button */}
      <Link
        to="/create-post"
        className="bg-primaryblue text-white px-4 py-2 rounded-lg hover:bg-accentpink transition-colors duration-200"
      >
      Create
      </Link>
      {/* Profile picture */}
      <img
        src="/assets/profile-pic.png" // replace with your profile image
        alt="Profile"
        className="w-10 h-10 rounded-full mr-4"
      />
    </div>
  );
}
