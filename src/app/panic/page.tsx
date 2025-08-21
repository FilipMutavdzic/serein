"use client";
import { useState } from "react";
import BreathPacer from "@/app/@/components/BreathPacer";

export default function Panic() {
  const [phase, setPhase] = useState<"intro"|"breathe"|"ground"|"done">("intro");

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Panic Rescue (60s)</h1>

      {phase==="intro" && (
        <div className="space-y-3">
          <p className="text-slate-700">You’re safe. We’ll do three short steps.</p>
          <ol className="list-decimal pl-5 text-slate-600">
            <li>4-7-8 breathing</li>
            <li>5-4-3-2-1 grounding</li>
            <li>Soft visual anchor</li>
          </ol>
          <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={()=>setPhase("breathe")}>Start</button>
        </div>
      )}

      {phase==="breathe" && (
        <div className="space-y-3">
          <BreathPacer pattern="4-7-8" seconds={60} onDone={()=>setPhase("ground")} />
        </div>
      )}

      {phase==="ground" && (
        <div className="space-y-3">
          <p className="text-slate-700">Name: 5 things you can see, 4 feel, 3 hear, 2 smell, 1 taste.</p>
          <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={()=>setPhase("done")}>Finish</button>
        </div>
      )}

      {phase==="done" && <div className="text-slate-700">Good job. Come back anytime.</div>}
    </main>
  );
}

