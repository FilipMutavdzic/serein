import Link from "next/link";

const rooms = [
  { slug: "rain-wipe", title: "Rain Wipe" },
  { slug: "glow-circle", title: "Glow Circle" },
  { slug: "ocean-wave", title: "Ocean Wave" }
];

export default function RoomsPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">All Rooms</h1>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((r) => (
          <li key={r.slug}>
            <Link className="block px-4 py-3 rounded-xl border hover:bg-slate-100"
                  href={`/session/${r.slug}`}>
              {r.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
