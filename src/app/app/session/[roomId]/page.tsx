"use client";
import { useEffect, useState } from "react";
import TapCadence from "@/components/TapCadence";
import AmbientToggle from "@/components/AmbientToggle";
import BreathPacer from "@/components/BreathPacer";

export default function SessionPage({ params }: { params: { roomId: string } }) {
  const [step, setStep] = useState<"pre"|"run"|"post"|"done">("pre");
  const [preScore, setPreScore] = useState(5);
  const [preCad, setPreCad] = useState(0);
  const [postScore, setPostScore] = useState(5);
  const [postCad, setPostCad] = useState(0);

  // Save a history item on finish
  useEffect(()=>{
    if (step==="done") {
      const item = { id: crypto.randomUUID(), room: params.roomId, preScore, preCad, postScore, postCad, at: Date.now() };
      const arr = JSON.parse(localStorage.getItem("serein_history")||"[]"); arr.unshift(item);
      localStorage.setItem("serein_history", JSON.stringify(arr.slice(0,200)));
      // streaks (very simple): store last day done
      const last = localStorage.getItem("serein_last_day");
      const today = new Date().toDateString();
      if (last !== today) {
        const s = Number(localStorage.getItem("serein_streak")||"0")+1;
        localStorage.setItem("serein_streak", String(s));
        localStorage.setItem("serein_last_day", today);
      }
    }
  },[step]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold capitalize">{params.roomId.replace("-", " ")}</h1>
        <AmbientToggle />
      </header>

      {step==="pre" && (
        <div className="space-y-4">
          <label className="block">How tense do you feel? <b>{preScore}/10</b></label>
          <input type="range" min={0} max={10} value={preScore} onChange={e=>setPreScore(Number(e.target.value))} className="w-full" />
          <TapCadence seconds={10} onScore={(s)=>setPreCad(s)} />
          <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={()=>setStep("run")}>Start</button>
        </div>
      )}

      {step==="run" && (
        <div className="space-y-4">
          {/* You can switch patterns based on roomId */}
          <BreathPacer pattern={params.roomId==="glow-circle" ? "4-7-8" : params.roomId==="ocean-wave" ? "coherent" : "box"} seconds={90} onDone={()=>setStep("post")} />
        </div>
      )}

      {step==="post" && (
        <div className="space-y-4">
          <label className="block">How tense now? <b>{postScore}/10</b></label>
          <input type="range" min={0} max={10} value={postScore} onChange={e=>setPostScore(Number(e.target.value))} className="w-full" />
          <TapCadence seconds={10} onScore={(s)=>setPostCad(s)} />
          <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={()=>setStep("done")}>Finish</button>
        </div>
      )}

      {step==="done" && (
        <div className="space-y-2">
          <div className="text-lg font-medium">Your Calm Score drift</div>
          <div className="text-slate-600">Self-report: {preScore} → {postScore}</div>
          <div className="text-slate-600">Cadence steadiness: {preCad.toFixed(1)} → {postCad.toFixed(1)}</div>
          <a className="underline" href="/app/history">See history</a>
        </div>
      )}
    </div>
  );
}
