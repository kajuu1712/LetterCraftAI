import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login()  {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/user/login", formData);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111]">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10">
        <h1 className="text-xl font-semibold text-white cursor-pointer" onClick={() => navigate("/")}>
          Letter<span className="text-purple-400">Craft</span> AI
        </h1>
        <button onClick={() => navigate("/")}
          className="px-4 py-2 text-sm text-gray-300 border border-white/20 rounded-lg hover:bg-white/10 transition">
          ← Back
        </button>
      </nav>

      {/* Form */}
      <div className="max-w-sm mx-auto mt-16 px-6">
        <h2 className="text-2xl font-semibold text-white mb-2">Welcome back</h2>
        <p className="text-sm text-gray-400 mb-8">Log in to your account</p>

        {error && (
          <div className="bg-red-900/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 text-sm bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 text-sm bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition disabled:opacity-50">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          No account?{" "}
          <span className="text-purple-400 cursor-pointer hover:underline" onClick={() => navigate("/signup")}>
            Sign up free
          </span>
        </p>
      </div>

    </div>
  );
};

