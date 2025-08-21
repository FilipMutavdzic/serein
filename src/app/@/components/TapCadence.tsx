"use client";

import { useEffect, useRef, useState } from "react";

export default function TapCadence({
  seconds = 10,
  onScore,
}: {
  seconds?: number;
  onScore?: (score: number) => void;
}) {
  const [running, setRunning] = useState(false);
  const [left, setLeft] = useState(seconds);
  const taps = useRef<number[]>([]); // timestamps (ms)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!running) return;
    setLeft(seconds);
    timerRef.current = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          setRunning(false);
          // compute steadiness score
          const arr = taps.current;
          let score = 0;
          if (arr.length >= 3) {
            const intervals = arr.slice(1).map((t, i) => t - arr[i]);
            const avg =
              intervals.reduce((a, b) => a + b, 0) / intervals.length;
            const variance =
              intervals.reduce((a, b) => a + Math.pow(b - avg, 2), 0) /
              intervals.length;
            const std = Math.sqrt(variance);
            // Lower std relative to avg = steadier. Normalize to 0..10
            score = Math.max(
              0,
              Math.min(10, 10 - (std / (avg || 1)) * 10)
            );
          }
          onScore?.(Number(score.toFixed(1)));
          taps.current = [];
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, seconds, onScore]);

  const tap = () => {
    if (!running) return;
    taps.current.push(Date.now());
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div className="font-medium">Tap Cadence</div>
        <div className="text-sm text-slate-600">{left}s</div>
      </div>
      <p className="text-sm text-slate-600 mt-1">
        Tap the button steadily until the timer ends.
      </p>
      <div className="mt-3 flex gap-3">
        <button
          className="btn btn-primary"
          onClick={() => setRunning(true)}
          disabled={running}
        >
          {running ? "Running…" : "Start"}
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => setRunning(false)}
          disabled={!running}
        >
          Stop
        </button>
        <button
          className="btn"
          onClick={tap}
          disabled={!running}
          style={{ background: "white", border: "1px solid #e5e7eb" }}
        >
          Tap
        </button>
      </div>
    </div>
  );
}
