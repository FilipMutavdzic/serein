import Link from "next/link";

const data: Record<string, {name:string; premium?:boolean; rooms:{slug:string; title:string; premium?:boolean}[]}>={
  "breathwork": { name:"Breathwork Escapes", rooms:[
    { slug:"rain-wipe", title:"Rain Wipe" },
    { slug:"glow-circle", title:"Glow Circle" },
  ]},
  "nature-calm": { name:"Nature Calm", rooms:[
    { slug:"ocean-wave", title:"Ocean Wave Sync" },
  ]},
  "panic-sos": { name:"Panic Rescue", rooms:[ { slug:"panic", title:"One-Tap Panic Protocol" } ]},
  "mind-reset": { name:"Mind Reset", premium:true, rooms:[
    { slug:"gratitude", title:"Gratitude Notes", premium:true },
  ]},
  "energy-release": { name:"Energy Release", premium:true, rooms:[
    { slug:"balloon-drift", title:"Balloon Drift", premium:true },
  ]},
  "sleep": { name:"Sleep & Wind-Down", premium:true, rooms:[ { slug:"fireflies", title:"Fireflies Glow", premium:true } ]},
  "focus": { name:"Focus Boost", premium:true, rooms:[ { slug:"tap-warmup", title:"Tap Cadence Warmup", premium:true } ]},
};

function isPaid() { return false; } // placeholder until Stripe

export default function Category({ params }: { params: { category: string } }) {
  const cat = data[params.category];
  if (!cat) return <main className="p-6">Category not found.</main>;

  const locked = cat.premium && !isPaid();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">{cat.name}</h1>
      {locked && (
        <div className="mb-4 rounded-xl border bg-yellow-50 p-4">
          <div className="font-medium">Premium category</div>
          <div className="text-sm">Unlock with the monthly plan. (Stripe coming next.)</div>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cat.rooms.map(r => (
          <div key={r.slug} className="rounded-2xl bg-white/70 p-5 shadow-sm border">
            <div className="font-medium">{r.title}</div>
            {(locked || (r.premium && !isPaid())) ? (
              <div className="mt-2 text-sm">
                <span className="inline-block text-xs bg-black text-white px-2 py-1 rounded mr-2">Locked</span>
                <Link href="/pricing" className="underline">See pricing</Link>
              </div>
            ) : (
              <Link className="mt-2 inline-block underline" href={`/session/${r.slug}`}>Open</Link>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
