import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

export default function Page() {
  const recs = [
    { href: '/sanctuary', title: 'Pocket Sanctuary', desc: 'Micro-break calm', img: '/media/images/gradient-1.png' },
    { href: '/tools/breathing', title: 'Breathing', desc: '2-min guided reset', img: '/media/images/gradient-2.png' },
    { href: '/meditation', title: 'Meditation', desc: 'Quick · Focus · Sleep', img: '/media/images/gradient-3.png' },
    { href: '/planner', title: 'Planner', desc: 'Tasks + Calm Blocks', img: '/media/images/gradient-1.png' },
    { href: '/happiness', title: 'Happiness', desc: 'Affirmations · Gratitude · Laugh', img: '/media/images/gradient-2.png' },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">How are you feeling?</h1>
      <div className="flex gap-2 text-2xl">
        {['😌','🙂','😕','😣','😤'].map(m => <button key={m} aria-label={`Mood ${m}`}>{m}</button>)}
      </div>

      <Link href="/tools/breathing"><Button className="w-full mt-2">Start a 2-min reset</Button></Link>

      <h2 className="text-lg font-semibold mt-4">Recommended</h2>
      <div className="grid grid-cols-2 gap-3">
        {recs.map((r) => (
          <Link key={r.href} href={r.href}>
            <Card bg={r.img}>
              <h3 className="font-medium text-white">{r.title}</h3>
              <p className="text-xs">{r.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
