"use client";
import { useEffect, useState } from "react";

export default function BreathPacer({ pattern="4-7-8", seconds=90, onDone }:{
  pattern?: "box" | "4-7-8" | "coherent" | string; seconds?: number; onDone?: ()=>void;
}) {
  const [phase, setPhase] = useState<"in"|"hold"|"out">("in");
  const [remaining, setRemaining] = useState(seconds);

  useEffect(()=>{ const t=setInterval(()=>setRemaining(r=>r-1),1000); return ()=>clearInterval(t); },[]);
  useEffect(()=>{ if (remaining<=0) onDone?.(); },[remaining]);

  useEffect(()=>{
    let inMs=4000, holdMs=7000, outMs=8000;
    if (pattern==="box"){ inMs=4000; holdMs=4000; outMs=4000; }
    if (pattern==="coherent"){ inMs=5500; holdMs=0; outMs=5500; }
    let active=true;
    (function loop(){
      if(!active) return;
      setPhase("in"); setTimeout(()=>{
        if(!active) return;
        if (holdMs>0){ setPhase("hold"); setTimeout(()=>{
          if(!active) return; setPhase("out"); setTimeout(loop,outMs);
        },holdMs);} else { setPhase("out"); setTimeout(loop,outMs); }
      },inMs);
    })();
    return ()=>{ active=false; };
  },[pattern]);

  return (
    <div className="grid place-items-center">
      <div className={`w-48 h-48 rounded-full border-4 transition-all duration-500 ${phase==="in"?"scale-110":phase==="hold"?"scale-100":"scale-90"}`} />
      <div className="mt-4 text-slate-600">{phase==="in"?"Breathe in":phase==="hold"?"Hold":"Breathe out"}</div>
      <div className="text-xs text-slate-400">Ends in {remaining}s</div>
    </div>
  );
}
