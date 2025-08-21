export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-sm text-slate-600">
        <div className="font-medium">
          <span className="text-[var(--brand-700)]">Serein</span> — two-minute micro escapes.
        </div>
        <div className="mt-2">© {new Date().getFullYear()} Serein</div>
      </div>
    </footer>
  );
}
