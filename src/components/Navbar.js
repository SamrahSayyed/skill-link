import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-primaryblue via-gradientmid to-accentpink shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-medium text-white">
          Skill Link
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex space-x-6 flex-1 justify-center text-white">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Right Links */}
        <div className="hidden md:flex space-x-4 text-white">
          <Link to="/login">Login</Link>
          <Link to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
