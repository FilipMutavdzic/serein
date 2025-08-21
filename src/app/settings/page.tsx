"use client";
import { useEffect, useState } from "react";

export default function Settings() {
  const [theme, setTheme] = useState("system");
  const [reduced, setReduced] = useState(false);

  useEffect(()=>{
    const t = localStorage.getItem("serein_theme") || "system"; setTheme(t);
    setReduced(localStorage.getItem("serein_reduced")==="1");
    applyTheme(t);
  },[]);
  function applyTheme(t:string){
    const html=document.documentElement;
    html.classList.remove("light","dark");
    if (t==="light") html.classList.add("light");
    if (t==="dark") html.classList.add("dark");
  }
  function saveTheme(t:string){
    setTheme(t); localStorage.setItem("serein_theme", t); applyTheme(t);
  }
  function toggleReduced(v:boolean){
    setReduced(v); localStorage.setItem("serein_reduced", v?"1":"0");
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <section className="rounded-xl bg-white/70 border p-4">
        <div className="font-medium mb-2">Theme</div>
        <div className="flex gap-2">
          <button className={`px-3 py-2 rounded-lg border ${theme==="system" && "bg-black text-white"}`} onClick={()=>saveTheme("system")}>System</button>
          <button className={`px-3 py-2 rounded-lg border ${theme==="light" && "bg-black text-white"}`} onClick={()=>saveTheme("light")}>Light</button>
          <button className={`px-3 py-2 rounded-lg border ${theme==="dark" && "bg-black text-white"}`} onClick={()=>saveTheme("dark")}>Dark</button>
        </div>
      </section>
      <section className="rounded-xl bg-white/70 border p-4">
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={reduced} onChange={e=>toggleReduced(e.target.checked)} />
          <span>Reduced motion</span>
        </label>
      </section>
    </main>
  );
}
