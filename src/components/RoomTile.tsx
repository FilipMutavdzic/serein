import Link from "next/link";

export default function RoomTile({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="block group">
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg transition transform group-hover:scale-[1.02]">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="opacity-90 mt-1">{description}</p>
      </div>
    </Link>
  );
}
