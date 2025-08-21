import Link from "next/link";

export default function AppHome() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Today’s micro escape</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <RoomCard slug="rain-wipe" title="Rain Wipe" />
        <RoomCard slug="glow-circle" title="Glow Circle" />
        <RoomCard slug="ocean-wave" title="Ocean Wave Sync" />
      </div>
      <div className="flex gap-3">
        <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/app/history">History</Link>
        <Link className="px-4 py-2 rounded-xl bg-white border" href="/app/circles">Calm Circles</Link>
      </div>
    </main>
  );
}

function RoomCard({ slug, title }: { slug: string; title: string }) {
  return (
    <a href={`/app/session/${slug}`} className="rounded-2xl bg-white/70 p-5 shadow-sm hover:shadow transition">
      <div className="h-24 rounded-xl bg-gradient-to-br from-white to-sky-50 mb-3" />
      <div className="font-medium">{title}</div>
      <div className="text-sm text-slate-500">2–3 minutes • ambient</div>
    </a>
  );
}
