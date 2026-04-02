import { useNavigate } from "react-router-dom";

export default function Landing () {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111]">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10">
        <h1 className="text-xl font-semibold text-white">
          Letter<span className="text-purple-400">Craft</span> AI
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm text-gray-300 border border-white/20 rounded-lg hover:bg-white/10 transition">
            Log in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-24">
        <span className="inline-block bg-purple-900/50 text-purple-300 text-xs font-medium px-3 py-1 rounded-full mb-5">
          AI letter writing suite
        </span>
        <h1 className="text-4xl font-semibold text-white max-w-xl mx-auto leading-tight mb-4">
          Write any professional letter in seconds
        </h1>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Cover letters, cold emails, resignation letters & more — AI-generated and tailored to you.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition">
            Get started free
          </button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 pb-16 max-w-4xl mx-auto">
        {[
          { emoji: "💼", title: "Job letters", sub: "Cover, referral, application" },
          { emoji: "📧", title: "HR emails", sub: "Cold, follow-up, thank you" },
          { emoji: "🎓", title: "Academic", sub: "Internship, NOC, SOP" },
          { emoji: "💰", title: "Workplace", sub: "Salary, resignation, promo" },
        ].map((item, i) => (
          <div key={i} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 text-center hover:border-purple-500/50 transition">
            <div className="text-2xl mb-3">{item.emoji}</div>
            <div className="text-sm font-medium text-white mb-1">{item.title}</div>
            <div className="text-xs text-gray-400">{item.sub}</div>
          </div>
        ))}
      </section>

    </div>
  );
};
