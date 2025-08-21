import Link from "next/link";

export default function Landing() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-24 text-center space-y-6">
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
        Calm that fits in <span className="underline decoration-sky-300">2 minutes</span>.
      </h1>
      <p className="text-lg text-slate-600">Build tiny rituals. Watch your Calm Score drift. One simple plan.</p>
      <div className="flex gap-3 justify-center">
        <Link className="px-6 py-3 rounded-xl bg-black text-white" href="/app">Try free for 7 days</Link>
        <Link className="px-6 py-3 rounded-xl bg-white border" href="/pricing">Pricing</Link>
      </div>
    </main>
  );
}
