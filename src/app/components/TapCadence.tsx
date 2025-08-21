"use client";
import { useEffect, useState } from "react";

/** Shows a beat to tap along (placeholder) */
export default function TapCadence({ bpm = 60 }: { bpm?: number }) {
  const interval = Math.round(60000 / bpm);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setOn(v => !v), interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className="grid place-items-center gap-2">
      <div
        className={`w-6 h-6 rounded-full ${on ? "bg-emerald-500" : "bg-emerald-200"}`}
        aria-label="Tap LED"
      />
      <div className="text-xs text-slate-500">Tap with the light — {bpm} BPM</div>
    </div>
  );
}
