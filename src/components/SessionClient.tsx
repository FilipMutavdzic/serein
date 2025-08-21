"use client";
import { useEffect, useState } from "react";
import TapCadence from "@components/TapCadence";
import AmbientToggle from "@components/AmbientToggle";
import BreathPacer from "@components/BreathPacer";

export default function SessionClient({ roomId }: { roomId: string }) {
  const [step, setStep] = useState<"pre" | "run" | "post" | "done">("pre");

  useEffect(() => {
    // Example timed flow
    if (step === "run") {
      const t = setTimeout(() => setStep("post"), 90_000);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold capitalize">
          {roomId.replaceAll("-", " ")}
        </h1>
        <AmbientToggle />
      </header>

      {step === "pre" && (
        <div className="space-y-4">
          <p className="text-slate-700">
            Find a comfortable posture. Tap to set your cadence (optional).
          </p>
          <TapCadence />
          <button className="px-4 py-2 rounded-xl bg-black text-white"
                  onClick={() => setStep("run")}>
            Start
          </button>
        </div>
      )}

      {step === "run" && (
        <div className="space-y-4">
          <BreathPacer />
          <button className="px-4 py-2 rounded-xl border"
                  onClick={() => setStep("post")}>
            Skip
          </button>
        </div>
      )}

      {step === "post" && (
        <div className="space-y-4">
          <p className="text-slate-700">How do you feel?</p>
          <button className="px-4 py-2 rounded-xl bg-black text-white"
                  onClick={() => setStep("done")}>
            Complete
          </button>
        </div>
      )}

      {step === "done" && <p className="text-slate-700">Session saved. 💫</p>}
    </main>
  );
}
