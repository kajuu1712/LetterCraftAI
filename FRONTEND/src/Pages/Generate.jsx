import { useState } from "react";
import api from "../api/axios";

const letterTypes = [
  { value: "cover_letter",        emoji: "💼", label: "Cover letter",         sub: "For job applications" },
  { value: "cold_email",          emoji: "📧", label: "Cold email to HR",      sub: "Reach out to recruiters" },
  { value: "internship_request",  emoji: "🎓", label: "Internship request",    sub: "For college students" },
  { value: "thank_you_email",     emoji: "🙏", label: "Thank you email",       sub: "Post-interview follow-up" },
  { value: "resignation_letter",  emoji: "✉️", label: "Resignation letter",    sub: "Leave gracefully" },
  { value: "salary_negotiation",  emoji: "💰", label: "Salary negotiation",    sub: "Ask for a raise" },
  { value: "follow_up_email",     emoji: "🔁", label: "Follow-up email",       sub: "No response after applying" },
  { value: "offer_acceptance",    emoji: "✅", label: "Offer acceptance",      sub: "Formally accept a job offer" },
];

const tones = ["formal", "friendly", "confident"];

export default function Generate() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTone, setSelectedTone] = useState("formal");
  const [input, setInput] = useState({ name: "", jobDescription: "", skills: "" });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/ai/generate", {
        type: selectedType,
        tone: selectedTone,
        input,
      });
      setOutput(data.letter.output);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedType(null);
    setSelectedTone("formal");
    setInput({ name: "", jobDescription: "", skills: "" });
    setOutput("");
    setError("");
  };

  // ── STEP 1 — Pick letter type ──
  if (step === 1) return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h3 className="text-base font-medium text-white mb-5">Choose letter type</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {letterTypes.map((lt) => (
          <div
            key={lt.value}
            onClick={() => setSelectedType(lt.value)}
            className={`bg-[#1a1a1a] border rounded-xl p-4 text-center cursor-pointer transition ${
              selectedType === lt.value
                ? "border-purple-500 border-2"
                : "border-white/10 hover:border-purple-500/50"
            }`}>
            <div className="text-2xl mb-2">{lt.emoji}</div>
            <div className="text-xs font-medium text-white mb-1">{lt.label}</div>
            <div className="text-xs text-gray-400">{lt.sub}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setStep(2)}
          disabled={!selectedType}
          className="px-6 py-2.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition disabled:opacity-40">
          Continue →
        </button>
      </div>
    </div>
  );

  // ── STEP 2 — Fill details ──
  if (step === 2) return (
    <div className="max-w-2xl mx-auto px-6 py-8">

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">1</span>
        <span className="text-gray-400">Type</span>
        <span className="text-white/20 mx-2">—</span>
        <span className="w-6 h-6 rounded-full bg-purple-500/30 border border-purple-500 text-purple-300 flex items-center justify-center text-xs">2</span>
        <span className="text-purple-400 font-medium">Details</span>
        <span className="text-white/20 mx-2">—</span>
        <span className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-white/20 text-gray-500 flex items-center justify-center text-xs">3</span>
        <span className="text-gray-500">Result</span>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 mb-4">
        <h3 className="text-base font-medium text-white mb-5">
          {letterTypes.find(l => l.value === selectedType)?.label} details
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-400 block mb-2">Your name - role applying for</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma — Frontend Developer"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              className="w-full px-4 py-2.5 text-sm bg-[#111111] border border-white/10 text-white placeholder-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-2">Description</label>
            <textarea
              placeholder="Paste the job description here or any other related description here ..."
              value={input.jobDescription}
              onChange={(e) => setInput({ ...input, jobDescription: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 text-sm bg-[#111111] border border-white/10 text-white placeholder-gray-600 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-2">Your key skills & experience</label>
            <input
              type="text"
              placeholder="e.g. React, Node.js, 2 projects, NIT grad, None or Others"
              value={input.skills}
              onChange={(e) => setInput({ ...input, skills: e.target.value })}
              className="w-full px-4 py-2.5 text-sm bg-[#111111] border border-white/10 text-white placeholder-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-2">Tone</label>
            <div className="flex gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTone(t)}
                  className={`px-4 py-1.5 text-xs rounded-lg border transition capitalize ${
                    selectedTone === t
                      ? "bg-purple-900/50 border-purple-500 text-purple-300"
                      : "border-white/10 text-gray-400 hover:border-white/30"
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => setStep(1)}
          className="px-5 py-2.5 text-sm text-gray-400 border border-white/10 rounded-lg hover:bg-white/5 transition">
          ← Back
        </button>
        <button
          onClick={handleGenerate}
          disabled={loading || !input.name || !input.jobDescription || !input.skills}
          className="flex-1 py-2.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition disabled:opacity-40">
          {loading ? "Generating..." : "Generate with AI ✦"}
        </button>
      </div>
    </div>
  );

  // ── STEP 3 — Result ──
  if (step === 3) return (
    <div className="max-w-2xl mx-auto px-6 py-8">

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">1</span>
        <span className="text-gray-400">Type</span>
        <span className="text-white/20 mx-2">—</span>
        <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">2</span>
        <span className="text-gray-400">Details</span>
        <span className="text-white/20 mx-2">—</span>
        <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">3</span>
        <span className="text-green-400 font-medium">Result</span>
      </div>

      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <div className="flex gap-2">
          <span className="bg-green-900/30 text-green-400 text-xs px-3 py-1 rounded-full">Generated</span>
          <span className="bg-white/5 text-gray-400 text-xs px-3 py-1 rounded-full capitalize">{selectedType?.replace(/_/g, " ")}</span>
          <span className="bg-white/5 text-gray-400 text-xs px-3 py-1 rounded-full capitalize">{selectedTone}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-1.5 text-xs text-gray-300 border border-white/10 rounded-lg hover:bg-white/5 transition">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap mb-4">
        {output}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(2)}
          className="flex-1 py-2.5 text-sm text-gray-400 border border-white/10 rounded-lg hover:bg-white/5 transition">
          Regenerate
        </button>
        <button
          onClick={handleReset}
          className="flex-1 py-2.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition">
          Write another letter
        </button>
      </div>
    </div>
  );
};

