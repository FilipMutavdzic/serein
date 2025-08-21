"use client";
import { useState } from "react";
import BreathPacer from "@components/BreathPacer";

export default function Panic() {
  const [phase, setPhase] = useState<"intro" | "breathe" | "ground" | "done">("intro");

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Panic Helper</h1>

      {phase === "intro" && (
        <div className="space-y-4">
          <p className="text-slate-700">
            You’re safe. Let’s take two minutes together.
          </p>
          <button className="px-4 py-2 rounded-xl bg-black text-white"
                  onClick={() => setPhase("breathe")}>
            Begin
          </button>
        </div>
      )}

      {phase === "breathe" && (
        <div className="space-y-4">
          <BreathPacer />
          <button className="px-4 py-2 rounded-xl border"
                  onClick={() => setPhase("ground")}>
            Continue
          </button>
        </div>
      )}

      {phase === "ground" && (
        <div className="space-y-3">
          <p className="text-slate-700">Name 5 things you can see…</p>
          <button className="px-4 py-2 rounded-xl bg-black text-white"
                  onClick={() => setPhase("done")}>
            Finish
          </button>
        </div>
      )}

      {phase === "done" && <p className="text-slate-700">Nice work. You’ve got this. 💙</p>}
    </main>
  );
}
