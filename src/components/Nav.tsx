"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/app", label: "App" },
  { href: "/rooms", label: "Rooms" },
  { href: "/history", label: "History" },
  { href: "/settings", label: "Settings" },
  { href: "/panic", label: "Panic" }
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center gap-2 flex-wrap bg-slate-900 text-white p-2 rounded-2xl shadow">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`px-3 py-1 rounded-xl transition
              ${active ? "bg-emerald-500" : "hover:bg-slate-700"}`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
