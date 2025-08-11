"use client";
import { useState } from "react";

export default function ScrollStopper() {
  const [input, setInput] = useState("");
  const [hooks, setHooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateHooks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setHooks(data.hooks || []);
    } catch (e) {
      console.error(e);
      setHooks([]);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>🚀 ScrollStopper MVP</h1>
      <p>Voer je tekst/idee in en genereer 3 scroll‑stopping hooks.</p>

      <textarea
        placeholder="Plak hier je tekst…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", height: 120, margin: "12px 0", padding: 12 }}
      />
      <button onClick={generateHooks} disabled={loading || !input.trim()}>
        {loading ? "Genereren…" : "Genereer Hooks"}
      </button>

      <ul style={{ marginTop: 16 }}>
        {hooks.map((hook, i) => (
          <li key={i} style={{ background: "#f3f4f6", padding: 10, borderRadius: 8, marginBottom: 8 }}>
            {hook}
          </li>
        ))}
      </ul>
    </div>
  );
}
