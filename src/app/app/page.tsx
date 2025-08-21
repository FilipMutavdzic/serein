import Link from "next/link";
import RoomTile from "../@/components/RoomTile"; // or "@/components/RoomTile" if your tsconfig alias is set

export default function AppHome() {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">Today’s micro escape</h1>
        <div className="flex gap-2">
          <Link href="/history" className="btn btn-primary">History</Link>
          <Link href="/rooms" className="btn btn-ghost">Browse rooms</Link>
        </div>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RoomTile id="rain-wipe"   name="Rain Wipe"      gradient="from-sky-400 to-indigo-500" />
        <RoomTile id="glow-circle" name="Glow Circle"    gradient="from-pink-500 to-rose-500" />
        <RoomTile id="ocean-wave"  name="Ocean Wave Sync" gradient="from-emerald-400 to-teal-500" />
      </section>
    </div>
  );
}

