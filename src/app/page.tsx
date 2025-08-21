import Link from "next/link";
import RoomTile from "@components/RoomTile";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Welcome to Serein</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <RoomTile
          title="Rain Wipe"
          description="A quick reset with gentle rainfall."
          href="/session/rain-wipe"
        />
        <RoomTile
          title="Glow Circle"
          description="Calming focus with soft pulses."
          href="/session/glow-circle"
        />
        <RoomTile
          title="Ocean Wave"
          description="Breathe with the tide."
          href="/session/ocean-wave"
        />
      </div>

      <div className="flex gap-3">
        <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/history">
          History
        </Link>
        <Link className="px-4 py-2 rounded-xl border" href="/rooms">
          Browse all
        </Link>
        <Link className="px-4 py-2 rounded-xl border" href="/panic">
          Panic helper
        </Link>
      </div>
    </main>
  );
}
