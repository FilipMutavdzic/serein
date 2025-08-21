"use client";
import { useEffect, useRef, useState } from "react";

export default function TapCadence({ seconds = 10, onScore }:{seconds?:number; onScore:(score:number)=>void}) {
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const times = useRef<number[]>([]);

  useEffect(()=>{
    let t:any; if (running) t=setTimeout(()=>finish(), seconds*1000);
    return ()=>clearTimeout(t);
  }, [running]);

  function tap() {
    if (!running) setRunning(true);
    times.current.push(performance.now());
    setCount(c=>c+1);
  }
  function finish() {
    setRunning(false);
    const intervals:number[]=[]; for (let i=1;i<times.current.length;i++) intervals.push(times.current[i]-times.current[i-1]);
    const avg = intervals.reduce((a,b)=>a+b,0)/Math.max(1,intervals.length);
    const variance = intervals.reduce((a,b)=>a+Math.pow(b-avg,2),0)/Math.max(1,intervals.length);
    const steadiness = Math.max(0, 100 - Math.sqrt(variance)/5);
    onScore(steadiness);
    times.current=[];
  }
  return (
    <div className="rounded-2xl bg-white/70 p-5 text-center">
      <div className="text-sm text-slate-600 mb-2">Tap steadily for {seconds}s</div>
      <button onClick={tap} className="w-40 h-40 rounded-full bg-gradient-to-br from-white to-sky-50 border text-lg">
        Tap
      </button>
      <div className="mt-2 text-slate-500">{running ? "Recording…" : `Taps: ${count}`}</div>
    </div>
  );
}
