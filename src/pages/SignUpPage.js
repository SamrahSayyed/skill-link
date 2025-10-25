import React from "react";
import { Link } from "react-router-dom";
import signupimage from "../assets/LoginRegisterPage/register-page.png"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      {/* Left Side: Image / Graphic */}
      <div className="hidden lg:block lg:w-1/2">
        <img src={signupimage} alt="Sign Up Graphic" className="w-full h-auto md:w-[450px] md:h-[450px] mb-10" />
        <p>Already have an account?  Login here </p>
                <button className="bg-primaryblue text-white py-3 rounded-lg font-semibold hover:bg-accentpink transition-colors duration-200 mt-3 p-6"><Link to="/signup">
                    Sign Up
                  </Link></button>
      </div>

      {/* Right Side: Form */}
      <div className="w-full max-w-md bg-gradient-to-r from-primaryblue/30 via-gradientmid/ /30 to-accentpink/30 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Sign Up</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Username" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primaryblue"/>
          <input type="email" placeholder="Email" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primaryblue"/>
          <input type="password" placeholder="Password" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primaryblue"/>
          <input type="text" placeholder="Location" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primaryblue"/>
          <textarea placeholder="Bio" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primaryblue"/>
          <input type="text" placeholder="Top 4 Skills (comma separated)" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primaryblue"/>
          <button className="bg-primaryblue text-white py-3 rounded-lg font-semibold hover:bg-accentpink transition-colors duration-200">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
