"use client";

import Link from "next/link";

interface RoomTileProps {
  id: string;          // session slug (/session/[id])
  name: string;
  description?: string;
  gradient?: string;   // optional tailwind gradient, e.g. "from-sky-400 to-indigo-500"
}

export default function RoomTile({
  id,
  name,
  description,
  gradient = "from-[var(--brand-500)] to-[var(--brand-700)]",
}: RoomTileProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-sm transition hover:shadow-lg">
      {/* gradient header */}
      <div className={`h-24 w-full bg-gradient-to-br ${gradient}`} />
      {/* body */}
      <div className="card -mt-6 mx-3 p-5">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-1 text-sm text-slate-600">
          {description || "A tiny ritual to reset your nervous system."}
        </p>
        <Link href={`/session/${id}`} className="btn btn-primary mt-4">
          Start
        </Link>
      </div>
    </div>
  );
}
