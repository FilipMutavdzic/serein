export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-500">
        <div>Serein — two-minute micro escapes.</div>
        <div className="mt-2">© {new Date().getFullYear()} Serein</div>
      </div>
    </footer>
  );
}
