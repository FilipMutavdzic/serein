"use client";
import { useEffect, useRef, useState } from "react";

export default function AmbientToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{osc1:OscillatorNode;osc2:OscillatorNode;noise:AudioBufferSourceNode;gain:GainNode}|null>(null);

  useEffect(()=>()=>{ stop(); },[]);
  function start() {
    if (on) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const gain = ctx.createGain(); gain.gain.value = 0.05;
    const osc1 = ctx.createOscillator(); osc1.type="sine"; osc1.frequency.value=140;
    const osc2 = ctx.createOscillator(); osc2.type="sine"; osc2.frequency.value=142.5;
    const buffer = ctx.createBuffer(1, ctx.sampleRate*2, ctx.sampleRate);
    const data = buffer.getChannelData(0); for (let i=0;i<data.length;i++) data[i]=(Math.random()*2-1)*0.05;
    const noise = ctx.createBufferSource(); noise.buffer=buffer; noise.loop=true;
    osc1.connect(gain); osc2.connect(gain); noise.connect(gain); gain.connect(ctx.destination);
    osc1.start(); osc2.start(); noise.start();
    ctxRef.current=ctx; nodesRef.current={osc1,osc2,noise,gain}; setOn(true);
  }
  function stop() {
    nodesRef.current?.osc1.stop(); nodesRef.current?.osc2.stop(); nodesRef.current?.noise.stop();
    ctxRef.current?.close(); nodesRef.current=null; ctxRef.current=null; setOn(false);
  }
  return (
    <button onClick={()=> on?stop():start()} className="px-3 py-1.5 rounded-lg border bg-white/70">
      {on ? "Ambient: On" : "Ambient: Off"}
    </button>
  );
}
