"use client";
import { useState } from "react";

export default function AmbientToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`px-3 py-1 rounded-xl shadow border
        ${on ? "bg-emerald-500 text-white border-emerald-600" : "bg-white"}`}
      title="Toggle ambient sound"
    >
      {on ? "Ambient ON" : "Ambient OFF"}
    </button>
  );
}
