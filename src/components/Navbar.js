// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="text-2xl font-bold">Skill Link</div>
        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:text-primaryblue">Home</Link>
          <a href="#about" className="hover:text-primaryblue">About</a>
          <a href="#features" className="hover:text-primaryblue">Features</a>
          <Link to="/login" className="hover:text-primaryblue">Login</Link>
          <Link to="/signup" className="bg-primaryblue text-white px-3 py-1 rounded-md">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}
