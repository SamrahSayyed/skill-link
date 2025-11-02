import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {

  console.log('API URL:', process.env.REACT_APP_API_URL);

  const [username, setUsername] = useState(""); // changed from 'name' to 'username'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // will be sent as password_hash
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // ← Replace your current fetch here with this:
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password_hash: password, // matches backend
        location: "",
        bio: "",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } else {
      setError(data.error || "Email already exists. Try logging in!");
    }
  } catch (err) {
    console.error(err);
    setError("Server error. Try again later.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border rounded-md"
            required
          />
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
            className="bg-green-600 hover:bg-green-700 text-white rounded-md py-2 font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
