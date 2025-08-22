export const metadata = { title: "History | Serein" };

export default function HistoryPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-sage">History</h1>
      <p className="text-slate-600 mt-1">We’ll store local session summaries here later.</p>
      <div className="card p-5 mt-6 text-slate-600">No entries yet.</div>
    </main>
  );
}
