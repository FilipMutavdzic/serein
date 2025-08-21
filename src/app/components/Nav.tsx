"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-semibold">Serein</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/app/rooms" className="underline">Rooms</Link>
          <Link href="/pricing" className="underline">Pricing</Link>
          <Link href="/panic" className="underline">Panic SOS</Link>
        </div>
      </nav>
    </header>
  );
}
