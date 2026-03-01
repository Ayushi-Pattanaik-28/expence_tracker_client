import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      if (!res.data?.access_token) {
        toast(res.data.message || "Login failed");
        return;
      }

      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      toast("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 max-w-full">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to your account to continue
        </p>

        <div className="space-y-4">
          <input
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 transition duration-200 outline-none"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 transition duration-200 outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-200"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-500 text-sm">No account yet? </span>
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
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
