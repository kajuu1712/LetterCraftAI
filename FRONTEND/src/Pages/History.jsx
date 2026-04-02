import { useEffect, useState } from "react";
import api from "../api/axios";

export default function History() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await api.get("/history/letter");
      setLetters(data.output);
    } catch (err) {
      setError("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/history/letter/${id}`);
      setLetters(letters.filter((l) => l._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  if (loading) return (
    <div className="text-center text-gray-500 py-20 text-sm">Loading...</div>
  );

  if (error) return (
    <div className="text-center text-red-400 py-20 text-sm">{error}</div>
  );

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-medium text-white">Saved letters</h3>
        <span className="text-xs text-gray-500">{letters.length} total</span>
      </div>

      {letters.length === 0 ? (
        <div className="text-center text-gray-500 py-16 text-sm">
          No letters yet — generate your first one!
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {letters.map((letter) => (
            <div key={letter._id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="text-sm font-medium text-white mb-2 capitalize">
                    {letter.type.replace(/_/g, " ")}
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-white/5 text-gray-400 text-xs px-2 py-0.5 rounded capitalize">
                      {letter.tone}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(letter.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setExpanded(expanded === letter._id ? null : letter._id)}
                    className="px-3 py-1.5 text-xs text-gray-300 border border-white/10 rounded-lg hover:bg-white/5 transition">
                    {expanded === letter._id ? "Hide" : "View"}
                  </button>
                  <button
                    onClick={() => handleDelete(letter._id)}
                    className="px-3 py-1.5 text-xs text-red-400 border border-red-900/50 rounded-lg hover:bg-red-900/20 transition">
                    Delete
                  </button>
                </div>
              </div>

              {expanded === letter._id && (
                <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {letter.output}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

