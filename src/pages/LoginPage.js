// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { loginUser } from "../api/dataService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await loginUser(email, password);
      setUser(u);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-lg p-3 focus:outline-none" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-lg p-3 focus:outline-none" required />
          <button type="submit" className="bg-primaryblue text-white py-3 rounded-lg">{loading ? "Logging in..." : "Login"}</button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account? <button onClick={() => navigate("/signup")} className="text-primaryblue">Sign up</button>
        </p>
      </div>
    </div>
  );
}
