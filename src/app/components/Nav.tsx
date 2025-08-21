"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/app", label: "App" },
  { href: "/app/rooms", label: "Rooms" },
  { href: "/app/history", label: "History" },
  { href: "/settings", label: "Settings" },
  { href: "/panic", label: "Panic" },
];
export default function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-white/60 backdrop-blur border-b">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">Serein</Link>
        <div className="flex gap-3">
          {tabs.map(t => (
            <Link key={t.href}
              href={t.href}
              className={`px-3 py-1.5 rounded-lg text-sm ${path===t.href ? "bg-black text-white" : "hover:bg-black/5"}`}>
              {t.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
