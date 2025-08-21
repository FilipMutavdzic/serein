"use client";
import { useState } from "react";

export default function AmbientToggle() {
  const [on, setOn] = useState(false);

  return (
    <button
      onClick={() => setOn(v => !v)}
      className="text-xs border px-3 py-1 rounded-full"
      aria-pressed={on}
      title="Ambient sound (placeholder)"
    >
      Ambient: {on ? "On" : "Off"}
    </button>
  );
}
