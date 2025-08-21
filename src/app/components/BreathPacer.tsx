"use client";
import { useEffect, useState } from "react";

/** Very simple breathing pacer: In 4s / Hold 4s / Out 6s */
export default function BreathPacer({
  cycleMs = 14000,
}: { cycleMs?: number }) {
  const phases = [
    { label: "Breathe In", ms: 4000 },
    { label: "Hold", ms: 4000 },
    { label: "Breathe Out", ms: 6000 },
  ];

  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI(prev => (prev + 1) % phases.length);
    }, phases[i].ms);
    return () => clearInterval(t);
  }, [i]);

  return (
    <div className="grid place-items-center gap-4">
      <div className="text-lg font-medium">{phases[i].label}</div>
      <div
        className="w-32 h-32 rounded-full bg-sky-200 transition-all"
        style={{
          transform:
            phases[i].label === "Breathe In"
              ? "scale(1.2)"
              : phases[i].label === "Breathe Out"
              ? "scale(0.8)"
              : "scale(1)",
        }}
      />
      <p className="text-xs text-slate-500">
        Simple demo pacer — replace with your final animation later.
      </p>
    </div>
  );
}
