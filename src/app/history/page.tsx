"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Item = { id:string; room:string; preScore:number; postScore:number; preCad:number; postCad:number; at:number };

export default function History() {
  const [items, setItems] = useState<Item[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(()=>{
    setItems(JSON.parse(localStorage.getItem("serein_history")||"[]"));
    setStreak(Number(localStorage.getItem("serein_streak")||"0"));
  },[]);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">History</h1>
      <div className="mb-4 rounded-xl bg-white/70 border p-4">Streak: <b>{streak}</b> day(s)</div>
      <div className="space-y-3">
        {items.length===0 && <div className="text-slate-600">No sessions yet. Start one from the <Link className="underline" href="/app">App</Link> page.</div>}
        {items.map(i=>(
          <div key={i.id} className="rounded-xl bg-white/70 border p-4">
            <div className="text-sm text-slate-500">{new Date(i.at).toLocaleString()}</div>
            <div className="font-medium capitalize">{i.room.replace("-"," ")}</div>
            <div className="text-slate-600 text-sm">Self-report: {i.preScore} → {i.postScore} | Cadence: {i.preCad.toFixed(1)} → {i.postCad.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
