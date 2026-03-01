import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await api.post("/auth/signup", { email, password });

      if (res.data.message === "User already exists") {
        toast("User already exists");
        return;
      }

      toast("Account created successfully");
      navigate("/");
    } catch (err) {
      toast("Signup failed"); a
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 max-w-full">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Sign up to start tracking your expenses
        </p>

        <div className="space-y-4">
          <input
            type="email"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 transition duration-200 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 transition duration-200 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-200"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-500 text-sm">
            Already have an account?{" "}
          </span>
          <Link to="/" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </div>

        <div className="mt-6 flex justify-center">
          <span className="text-gray-300 text-xs">
            &copy; {new Date().getFullYear()} Expense Tracker
          </span>
        </div>
      </div>
    </div>
  );
}
