"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Simple breathing pacer. pattern:
 * - "box":     4 in / 4 hold / 4 out / 4 hold
 * - "coherent": 5.5 sec inhale/exhale (approx)
 * - "4-7-8":   4 in / 7 hold / 8 out
 */
export default function BreathPacer({
  pattern = "box",
  seconds = 90,
  onDone,
}: {
  pattern?: "box" | "coherent" | "4-7-8";
  seconds?: number;
  onDone?: () => void;
}) {
  const [left, setLeft] = useState(seconds);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const seq = useMemo(() => {
    if (pattern === "coherent") {
      return [
        { phase: "in", dur: 5.5 },
        { phase: "out", dur: 5.5 },
      ];
    }
    if (pattern === "4-7-8") {
      return [
        { phase: "in", dur: 4 },
        { phase: "hold", dur: 7 },
        { phase: "out", dur: 8 },
      ];
    }
    // box
    return [
      { phase: "in", dur: 4 },
      { phase: "hold", dur: 4 },
      { phase: "out", dur: 4 },
      { phase: "hold", dur: 4 },
    ];
  }, [pattern]);

  useEffect(() => {
    let total = seconds;
    let idx = 0;
    setPhase(seq[0].phase as any);
    setLeft(seconds);

    const tick = () => {
      const step = seq[idx];
      setPhase(step.phase as any);
      const ms = step.dur * 1000;
      const started = Date.now();

      const inner = () => {
        const elapsed = Date.now() - started;
        const remainThisStep = Math.max(0, ms - elapsed);
        const delta = Math.min(ms, elapsed) / 1000;
        total -= delta;
        setLeft((prev) => Math.max(0, Math.ceil(total)));
        if (remainThisStep > 16 && total > 0) {
          timerRef.current = setTimeout(inner, 100);
        } else {
          // move to next step
          if (total <= 0) {
            onDone?.();
            return;
          }
          idx = (idx + 1) % seq.length;
          tick();
        }
      };
      inner();
    };

    tick();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [seconds, seq, onDone]);

  return (
    <div className="card p-6 text-center">
      <div className="text-sm text-slate-500 mb-1">{left}s left</div>
      <div className="text-2xl font-semibold capitalize mb-4">{phase}</div>
      <div className="mx-auto h-40 w-40 rounded-full bg-gradient-to-br from-[var(--brand-300)] to-[var(--brand-500)] opacity-80 animate-pulse" />
      <div className="mt-4 text-slate-600">
        Follow the circle — breathe with the phase.
      </div>
    </div>
  );
}
