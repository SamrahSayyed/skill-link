// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ProfileAvatar from "./ProfileAvatar";

export default function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>Skill Link</div>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/" className="hidden md:inline hover:text-primaryblue">Home</Link>
          <a href="#about" className="hidden md:inline hover:text-primaryblue">About</a>
          <a href="#features" className="hidden md:inline hover:text-primaryblue">Features</a>
        </nav>
         
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm hover:text-primaryblue">Login</Link>
              <Link to="/signup" className="bg-primaryblue text-white px-3 py-1 rounded-md hover:bg-accentpink transition">Sign Up</Link>
            </div>
      </div>
    </header>
  );
}
