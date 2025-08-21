"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/app", label: "App" },
  { href: "/rooms", label: "Rooms" },
  { href: "/history", label: "History" },
  { href: "/settings", label: "Settings" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b bg-white/60 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="text-[var(--brand-700)]">Serein</span>
        </Link>
        <nav className="flex gap-1">
          {tabs.map((t) => {
            const active = path === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  active ? "bg-[var(--brand-600)] text-white" : "hover:bg-black/5"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
