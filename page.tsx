import Link from "next/link";
import RoomTile from "components/RoomTile";

export default function HomePage() {
  const rooms = [
    { slug: "rain-wipe", title: "Rain Wipe", color: "from-sky-500 to-blue-700" },
    { slug: "slow-circle", title: "Slow Circle", color: "from-indigo-500 to-violet-700" },
    { slug: "ocean-wave", title: "Ocean Wave", color: "from-cyan-500 to-teal-700" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Welcome to Serein</h1>
        <p className="text-white/70">Pick a micro-escape to begin.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((r) => (
          <RoomTile
            key={r.slug}
            href={`/session/${r.slug}`}
            title={r.title}
            gradient={r.color}
          />
        ))}
      </div>

      <div className="mt-10 flex gap-4">
        <Link href="/history" className="text-white/80 hover:text-white underline">
          History
        </Link>
        <Link href="/panic" className="text-white/80 hover:text-white underline">
          Panic
        </Link>
      </div>
    </main>
  );
}

