export default function Pricing() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">Pricing</h1>
      <div className="card p-6">
        <div className="text-lg font-medium">Serein Plus</div>
        <p className="text-slate-600">One plan • $7.49/month • 7-day free trial.</p>
        <ul className="mt-3 list-disc pl-6 text-slate-600">
          <li>Premium rooms unlocked</li>
          <li>Calm Score history</li>
          <li>Priority features</li>
        </ul>
        <button className="btn btn-primary mt-4">Subscribe (Stripe soon)</button>
      </div>
    </div>
  );
}
