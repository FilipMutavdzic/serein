// components/breathing/BreathPacer.tsx
'use client'
import { useEffect, useRef, useState } from 'react'

type Mode = 'box'|'478'|'custom'
export function BreathPacer({ mode='box', seconds=60 }:{ mode?:Mode; seconds?:number }){
  const [t, setT] = useState(0)
  const req = useRef<number>()
  const start = useRef<number>()
  const prefersReduced = typeof window!=='undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(()=>{
    const total = seconds*1000
    const step = (ts:number)=>{
      if (!start.current) start.current = ts
      const elapsed = (ts - start.current) % total
      setT(elapsed/total)
      req.current = requestAnimationFrame(step)
    }
    req.current = requestAnimationFrame(step)
    return ()=>{ if (req.current) cancelAnimationFrame(req.current) }
  },[seconds])

  // Pattern timings (fractions of a cycle)
  const pattern = mode==='box' ? [0.25,0.25,0.25,0.25] : mode==='478' ? [4/19,7/19,8/19] : [0.33,0.34,0.33]
  const phase = getPhase(t, pattern)

  // Haptics on phase change
  const lastPhase = useRef<number>(-1)
  useEffect(()=>{
    if (lastPhase.current !== phase.index){
      lastPhase.current = phase.index
      if (navigator.vibrate){ navigator.vibrate(10) }
    }
  },[phase.index])

  const radius = 60, circ = 2*Math.PI*radius
  const progress = phase.progress
  const dash = prefersReduced ? 0 : circ * progress

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180" viewBox="0 0 180 180" aria-label="breathing pacer">
        <circle cx="90" cy="90" r={radius} stroke="#E2E8F0" strokeWidth="10" fill="none"/>
        <circle cx="90" cy="90" r={radius} stroke="var(--brand)" strokeWidth="10" fill="none"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 90 90)"/>
      </svg>
      <div className="mt-2 text-sm text-muted">
        {mode==='box' && ['Inhale','Hold','Exhale','Hold'][phase.index]}
        {mode==='478' && ['Inhale 4','Hold 7','Exhale 8'][phase.index]}
        {mode==='custom' && ['Inhale','Exhale','Rest'][phase.index]}
      </div>
    </div>
  )
}

function getPhase(t:number, seg:number[]){
  let acc = 0, index = 0
  for (let i=0;i<seg.length;i++){
    const next = acc + seg[i]
    if (t<=next){ index = i; const local = (t-acc)/(seg[i]||1); return { index, progress: local } }
    acc = next
  }
  return { index: seg.length-1, progress: 1 }
}
