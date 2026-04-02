import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Generate from "./Generate.jsx";
import History from "./History.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("generate");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#111111]">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10">
        <h1 className="text-xl font-semibold text-white">
          Letter<span className="text-purple-400">Craft</span> AI
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-300 text-xs font-medium">
            YO
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-400 border border-red-900/50 rounded-lg hover:bg-red-900/20 transition">
            Log out
          </button>
        </div>
      </nav>

      {/* Tab Bar */}
      <div className="flex gap-1 px-8 border-b border-white/10">
        <button
          onClick={() => setActiveTab("generate")}
          className={`px-4 py-3 text-sm border-b-2 transition ${
            activeTab === "generate"
              ? "border-purple-500 text-purple-400 font-medium"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}>
          Generate
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-3 text-sm border-b-2 transition ${
            activeTab === "history"
              ? "border-purple-500 text-purple-400 font-medium"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}>
          My letters
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "generate" ? <Generate /> : <History />}
      </div>

    </div>
  );
};

