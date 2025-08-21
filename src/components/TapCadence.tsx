"use client";
import { useState } from "react";

export default function TapCadence() {
  const [taps, setTaps] = useState<number[]>([]);

  const tap = () => {
    const now = Date.now();
    setTaps((prev) => [...prev.slice(-3), now]);
  };

  let bpm = 0;
  if (taps.length > 1) {
    const gaps = taps.slice(1).map((t, i) => t - taps[i]);
    const avg = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    bpm = Math.round(60000 / avg);
  }

  return (
    <div className="text-center space-y-2">
      <button onClick={tap} className="px-5 py-3 rounded-xl bg-pink-500 text-white shadow">
        Tap
      </button>
      <div className="text-slate-700">{bpm ? `${bpm} BPM` : "Tap to set pace"}</div>
    </div>
  );
}
