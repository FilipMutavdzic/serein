// components/Timer.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { Progress } from './ui'

export function Timer({seconds=60,onDone}:{seconds?:number; onDone?:()=>void}){
  const [left,setLeft] = useState(seconds)
  const id = useRef<number|undefined>()
  useEffect(()=>{
    const tick = ()=>{
      setLeft(prev => {
        const next = Math.max(0, prev-1)
        if (next===0){ if (navigator.vibrate) navigator.vibrate([30,30,30]); onDone?.(); window.clearInterval(id.current) }
        else { if (navigator.vibrate) navigator.vibrate(5) }
        return next
      })
    }
    id.current = window.setInterval(tick, 1000)
    return ()=> window.clearInterval(id.current)
  },[seconds, onDone])
  const pct = Math.round(((seconds-left)/seconds)*100)
  return (
    <div>
      <Progress value={pct} />
      <div className="mt-1 text-xs text-muted" aria-live="polite">{left}s left</div>
    </div>
  )
}
