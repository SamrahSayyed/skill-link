import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Optional: check if REACT_APP_API_URL is loaded
  console.log("API URL:", process.env.REACT_APP_API_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password_hash: password, // matches backend
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-primaryblue hover:bg-accentpink text-white rounded-md py-2 font-semibold"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-primaryblue hover:text-accentpink cursor-pointer font-semibold"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
