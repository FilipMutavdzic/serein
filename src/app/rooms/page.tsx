import Link from "next/link";

const categories = [
  { slug: "breathwork", name: "Breathwork Escapes", desc: "Guided breathing & pacers", premium: false },
  { slug: "nature-calm", name: "Nature Calm", desc: "Waves, sky, forest visuals", premium: false },
  { slug: "mind-reset", name: "Mind Reset", desc: "Gratitude, senses scan", premium: true },
  { slug: "energy-release", name: "Energy Release", desc: "Pop, drift, stretch", premium: true },
  { slug: "panic-sos", name: "Panic Rescue", desc: "60s emergency reset", premium: false },
  { slug: "sleep", name: "Sleep & Wind-Down", desc: "Fireflies, star drift", premium: true },
  { slug: "focus", name: "Focus Boost", desc: "Tap cadence warmups", premium: true },
];

export default function Rooms() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(c => (
          <Link key={c.slug} href={`/app/rooms/${c.slug}`}
            className="rounded-2xl bg-white/70 p-5 shadow-sm hover:shadow transition border">
            <div className="text-lg font-medium">{c.name}</div>
            <div className="text-sm text-slate-500">{c.desc}</div>
            {c.premium && <div className="mt-2 inline-block text-xs bg-black text-white px-2 py-1 rounded">Premium</div>}
          </Link>
        ))}
      </div>
    </main>
  );
}
