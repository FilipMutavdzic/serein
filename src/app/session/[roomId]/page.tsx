"use client";

import { use } from "react";
import Link from "next/link";
import TapCadence from "@/components/TapCadence";
import AmbientToggle from "@/components/AmbientToggle";
import BreathPacer from "@/components/BreathPacer";

type ParamsPromise = Promise<{ roomId: string }>;

export default function SessionPage({ params }: { params: ParamsPromise }) {
  const { roomId } = use(params);
  const pretty = roomId.replace(/-/g, " ");
  const state = useSessionState(roomId);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold capitalize">{pretty}</h1>
        <AmbientToggle />
      </header>

      {state.view === "pre" && (
        <PreView
          preScore={state.preScore}
          setPreScore={state.setPreScore}
          setPreCad={state.setPreCad}
          next={() => state.setView("run")}
        />
      )}

      {state.view === "run" && (
        <BreathPacer
          pattern={
            roomId === "glow-circle"
              ? "4-7-8"
              : roomId === "ocean-wave"
              ? "coherent"
              : "box"
          }
          seconds={90}
          onDone={() => state.setView("post")}
        />
      )}

      {state.view === "post" && (
        <PostView
          postScore={state.postScore}
          setPostScore={state.setPostScore}
          setPostCad={state.setPostCad}
          finish={() => state.finish()}
        />
      )}

      {state.view === "done" && (
        <DoneView
          preScore={state.preScore}
          postScore={state.postScore}
          preCad={state.preCad}
          postCad={state.postCad}
        />
      )}
    </div>
  );
}

/** --- hooks & little views --- */
import { useEffect, useState } from "react";

function useSessionState(roomId: string) {
  const [view, setView] = useState<"pre" | "run" | "post" | "done">("pre");
  const [preScore, setPreScore] = useState(5);
  const [preCad, setPreCad] = useState(0);
  const [postScore, setPostScore] = useState(5);
  const [postCad, setPostCad] = useState(0);

  useEffect(() => {
    if (view !== "done") return;
    const item = {
      id: crypto.randomUUID(),
      room: roomId,
      preScore,
      preCad,
      postScore,
      postCad,
      at: Date.now(),
    };
    const arr = JSON.parse(localStorage.getItem("serein_history") || "[]");
    arr.unshift(item);
    localStorage.setItem("serein_history", JSON.stringify(arr.slice(0, 200)));

    const today = new Date().toDateString();
    const last = localStorage.getItem("serein_last_day");
    if (last !== today) {
      const s = Number(localStorage.getItem("serein_streak") || "0") + 1;
      localStorage.setItem("serein_streak", String(s));
      localStorage.setItem("serein_last_day", today);
    }
  }, [view, roomId, preScore, preCad, postScore, postCad]);

  const finish = () => setView("done");

  return {
    view,
    setView,
    preScore,
    setPreScore,
    preCad,
    setPreCad,
    postScore,
    setPostScore,
    postCad,
    setPostCad,
    finish,
  };
}

function PreView({
  preScore,
  setPreScore,
  setPreCad,
  next,
}: {
  preScore: number;
  setPreScore: (n: number) => void;
  setPreCad: (n: number) => void;
  next: () => void;
}) {
  return (
    <section className="space-y-4">
      <label className="block">
        How tense do you feel? <b>{preScore}/10</b>
      </label>
      <input
        type="range"
        min={0}
        max={10}
        value={preScore}
        onChange={(e) => setPreScore(Number(e.target.value))}
        className="w-full"
      />
      <TapCadence seconds={10} onScore={setPreCad} />
      <button className="btn btn-primary" onClick={next}>
        Start
      </button>
    </section>
  );
}

function PostView({
  postScore,
  setPostScore,
  setPostCad,
  finish,
}: {
  postScore: number;
  setPostScore: (n: number) => void;
  setPostCad: (n: number) => void;
  finish: () => void;
}) {
  return (
    <section className="space-y-4">
      <label className="block">
        How tense now? <b>{postScore}/10</b>
      </label>
      <input
        type="range"
        min={0}
        max={10}
        value={postScore}
        onChange={(e) => setPostScore(Number(e.target.value))}
        className="w-full"
      />
      <TapCadence seconds={10} onScore={setPostCad} />
      <button className="btn btn-primary" onClick={finish}>
        Finish
      </button>
    </section>
  );
}

function DoneView({
  preScore,
  postScore,
  preCad,
  postCad,
}: {
  preScore: number;
  postScore: number;
  preCad: number;
  postCad: number;
}) {
  return (
    <section className="space-y-2">
      <div className="text-lg font-medium">Your Calm Score drift</div>
      <div className="text-slate-600">
        Self-report: {preScore} → {postScore}
      </div>
      <div className="text-slate-600">
        Cadence steadiness: {preCad.toFixed(1)} → {postCad.toFixed(1)}
      </div>
      <Link className="underline" href="/history">
        See history
      </Link>
    </section>
  );
}
