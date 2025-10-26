import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimage from "../assets/LoginRegisterPage/login-page.png";
import { useUser } from "../context/UserContext"; // ✅ fixed casing

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const mockUser = {
      username: "Samrah", // consistent with your mock data
      email,
      profilePic: null,
    };

    setUser(mockUser);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      {/* Left Side */}
      <div className="hidden lg:block lg:w-1/2 text-center">
        <img src={loginimage} alt="Login Graphic" className="w-full h-auto md:w-[500px] md:h-[500px] mx-auto" />
        <p className="mt-4 text-gray-700">Don't have an account?</p>
        <Link to="/signup">
          <button className="bg-primaryblue text-white py-3 px-8 rounded-lg font-semibold hover:bg-accentpink transition-colors duration-200 mt-3">
            Sign Up
          </button>
        </Link>
      </div>

      {/* Right Side: Form */}
      <div className="w-full max-w-md bg-gradient-to-r from-primaryblue/30 via-gradientmid/30 to-accentpink/30 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-10 text-white text-center">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primaryblue"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primaryblue"
            required
          />
          <button
            type="submit"
            className="bg-primaryblue text-white py-3 rounded-lg font-semibold hover:bg-accentpink transition-colors duration-200 mt-10"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
