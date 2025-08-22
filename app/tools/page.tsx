// app/tools/page.tsx
import Link from 'next/link'
import { Card } from '@/components/ui'

const tools = [
  { href:'/tools/breathing', title:'Breathing', desc:'Box • 4-7-8 • custom' },
  { href:'/tools/sos', title:'SOS (90s)', desc:'Breathe → Name → Ground' },
  { href:'/tools/grounding', title:'Grounding', desc:'5-4-3-2-1 senses' },
  { href:'/tools/body-scan', title:'Body Scan', desc:'Head to toe release' },
  { href:'/tools/cbt', title:'CBT Reframe', desc:'Thought → Evidence → Balanced' },
]

export default function Tools(){
  return (
    <div className="grid gap-3">
      {tools.map(t=>(
        <Link key={t.href} href={t.href}>
          <Card className="p-4">
            <h3 className="font-medium">{t.title}</h3>
            <p className="text-sm text-muted">{t.desc}</p>
          </Card>
        </Link>
      ))}
    </div>
  )
}
