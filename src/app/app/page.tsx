import Link from "next/link";

export default function AppHome() {
  return (
    <main className="space-y-6">
      <h2 className="text-2xl font-semibold">Today’s micro escape</h2>
      <div className="flex gap-3">
        <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/history">
          History
        </Link>
        <Link className="px-4 py-2 rounded-xl border" href="/rooms">
          Calm Circles
        </Link>
      </div>
    </main>
  );
}
