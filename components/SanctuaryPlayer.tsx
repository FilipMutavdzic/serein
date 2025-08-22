// components/SanctuaryPlayer.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { BreathPacer } from './breathing/BreathPacer'
import { Button, Pill, Card } from './ui'
import { Timer } from './Timer'
import { makeContext, pair, type Pairing } from '@/lib/pairing-engine'
import { useStore } from '@/lib/store'
import { RandomPhoto } from './media/RandomPhoto'
import { RandomVideo } from './media/RandomVideo'
import { RandomSound } from './media/RandomSound'

export function SanctuaryPlayer(){
  const mood = useStore(s=>s.mood)
  const [p,setP] = useState<Pairing>(()=>pair(mood, makeContext(), 'init'))
  const [dur,setDur] = useState(p.durationSec)
  const [pipOpen, setPipOpen] = useState(false)
  const pipRef = useRef<HTMLDivElement>(null)

  function shuffle(){ const np = pair(mood, makeContext(), crypto.randomUUID()); setP(np); setDur(np.durationSec) }
  function toggleDur(){ setDur(d=> (d>=120 ? 60 : 120)) }

  async function openPiP(){
    const anyDoc: any = document as any
    if (!('documentPictureInPicture' in document)) return alert('Picture-in-Picture not supported on this browser.')
    const win = await (anyDoc.documentPictureInPicture.requestWindow({ width: 220, height: 260 }))
    setPipOpen(true)
    // Clone our pacer node
    const node = pipRef.current?.cloneNode(true) as HTMLElement
    if (node) win.document.body.appendChild(node)
    win.addEventListener('pagehide', ()=> setPipOpen(false), { once:true })
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Pocket Sanctuary</h3>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={shuffle}>Shuffle Again</Button>
            <Button variant="secondary" onClick={toggleDur}>Longer ({dur>=120?'2m':'1m'})</Button>
          </div>
        </div>
        <div className="mt-3 grid gap-4">
          {/* Media */}
          <div className="rounded-2xl overflow-hidden">
            <RandomVideo category={p.category} seed="sanctuary"/>
          </div>
          <RandomSound category={p.category} seed="sanctuary"/>
          {/* Mantra */}
          <div className="text-center">
            <Pill>{p.mantra}</Pill>
          </div>
          {/* Breathing + PiP */}
          <div className="flex flex-col items-center" ref={pipRef}>
            <BreathPacer mode={p.breath==='box'?'box':p.breath==='478'?'478':'box'} seconds={dur}/>
            <div className="mt-2">
              <Button variant="ghost" onClick={openPiP} aria-disabled={pipOpen}>Keep pacer in PiP</Button>
            </div>
          </div>
          <Timer seconds={dur}/>
        </div>
      </Card>
      <div className="text-xs text-muted text-center">PiP shows the pacer in a tiny floating window so you can keep calm while multitasking.</div>
    </div>
  )
}
