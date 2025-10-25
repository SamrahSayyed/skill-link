import React from "react";
import HeartIcon from "../assets/LandingPage/landing-page-footer-heart.png";
import RightImage from "../assets/LandingPage/landing-page-footer.png";
export default function Footer() {
  return (
    <footer className="bg-black w-full h-[544px] px-6 md:pl-[89px] py-8 mt-auto">
      <div className="flex justify-between items-center h-full">
        {/* Left Section */}
        <div className="flex flex-col items-start text-white">
          <h1 className="text-4xl font-bold mb-2">Skill Link</h1>
          <p className="text-sm mb-4">&copy; 2025 Skill Link</p>
          <p className="text-base flex items-center gap-1">
            Made with
            <img src={HeartIcon} alt="heart" className="w-5 h-5" />
            by Samrah
          </p>
        </div>

        {/* Right Section */}
        <div>
          <img src={RightImage} alt="footer illustration" className="h-[300px] object-contain md:pr-[168.4px]" />
        </div>
      </div>
    </footer>
  );
}
