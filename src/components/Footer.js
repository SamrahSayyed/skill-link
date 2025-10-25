import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black py-8 px-6 md:pl-[89]">
      {/* Left section */}
      <div className="flex flex-col items-start text-white">
        {/* Brand / Skill Link */}
        <h1 className="text-4xl font-bold mb-2">Skill Link</h1>

        {/* Copyright */}
        <p className="text-sm  mb-4">&copy; 2025 Skill Link. All rights reserved.</p>

        {/* Made with heart */}
        <p className="text-base  flex items-center gap-1">
          Made with
          <img src="{HeartIcon}" alt="heart" className="w-5 h-5" />
          by Samrah
        </p>
      </div>
    </footer>
  );
}
