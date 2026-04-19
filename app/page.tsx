"use client";
import { useState } from "react";

export default function SportsCommentaryPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true); setResult("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: input }) });
      const data = await res.json();
      setResult(data.result || data.error || "No result");
    } catch { setResult("Error generating content."); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-amber-400 mb-2 text-center">🏈 AI Sports Commentary & Play-by-Play Writer</h1>
        <p className="text-gray-400 mb-6 text-center">Describe the sporting event moment</p>
        <textarea className="w-full bg-gray-800 border border-amber-500/30 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors resize-none" rows={5} placeholder="Describe your sports moment... (e.g., Final 2 minutes of the Super Bowl, 4th quarter, team down by 3 with the ball on their own 20-yard line)" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleGenerate} disabled={loading || !input.trim()} className="mt-4 w-full bg-amber-600 hover:bg-amber-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 rounded-xl transition-colors">{loading ? "Commentating..." : "Generate Commentary"}</button>
        {result && <div className="mt-6 bg-gray-800/60 border border-amber-500/20 rounded-xl p-5"><h3 className="text-amber-400 font-semibold mb-3">Play-by-Play Script</h3><pre className="whitespace-pre-wrap text-gray-200 text-sm font-mono">{result}</pre></div>}
      </div>
    </main>
  );
}
