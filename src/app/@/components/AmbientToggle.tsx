"use client";

import { useEffect, useState } from "react";

export default function AmbientToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("serein_ambient");
    setOn(saved === "on");
  }, []);

  useEffect(() => {
    localStorage.setItem("serein_ambient", on ? "on" : "off");
  }, [on]);

  return (
    <button
      className={`px-3 py-1.5 rounded-lg text-sm border transition ${
        on ? "bg-[var(--brand-600)] text-white" : "bg-white"
      }`}
      onClick={() => setOn((v) => !v)}
    >
      Ambient {on ? "On" : "Off"}
    </button>
  );
}

