import React from "react";
import loginimage from "../assets/LoginRegisterPage/login-page.png"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      {/* Left Side: Image / Graphic */}
      <div className="hidden lg:block lg:w-1/2">
        <img src={loginimage} alt="Login Graphic" className="w-full h-auto md:w-[550px] md:h-[500px]" />
      </div>

      {/* Right Side: Form */}
      <div className="w-full max-w-md bg-gradient-to-r from-primaryblue via-gradientmid to-accentpink p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-maintextblack">Login</h2>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primaryblue"/>
          <input type="password" placeholder="Password" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primaryblue"/>
          <button className="bg-primaryblue text-white py-3 rounded-lg font-semibold hover:bg-accentpink transition-colors duration-200">Login</button>
        </form>
      </div>
    </div>
  );
}
