export default function Footer() {
  return (
    <footer className="border-t text-xs text-slate-500">
      <div className="max-w-6xl mx-auto p-4">
        © {new Date().getFullYear()} Serein — Two-minute micro escapes.
      </div>
    </footer>
  );
}
