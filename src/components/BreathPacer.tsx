"use client";
import { useEffect, useState } from "react";

export default function BreathPacer() {
  const [phase, setPhase] = useState("Inhale");

  useEffect(() => {
    const seq = ["Inhale", "Hold", "Exhale", "Hold"];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % seq.length;
      setPhase(seq[i]);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-center">
      <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg animate-pulse">
        {phase}
      </div>
    </div>
  );
}
