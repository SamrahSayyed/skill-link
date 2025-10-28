// src/pages/SignupPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { createUser } from "../api/dataService";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const newUser = await createUser({ username, email, password });
      setUser(newUser);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border rounded-lg p-3 focus:outline-none" required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="border rounded-lg p-3 focus:outline-none" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="border rounded-lg p-3 focus:outline-none" required />
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" className="border rounded-lg p-3 focus:outline-none" required />
          <button type="submit" disabled={loading} className="bg-primaryblue text-white py-3 rounded-lg">{loading ? "Creating..." : "Create account"}</button>
        </form>
        <p className="text-center text-sm mt-4">Already have an account? <button onClick={() => navigate("/login")} className="text-primaryblue">Log In</button></p>
      </div>
    </div>
  );
}
