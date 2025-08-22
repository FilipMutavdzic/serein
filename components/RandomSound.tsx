// components/media/RandomSound.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { getRandom, type Category } from '@/lib/media'

export function RandomSound({category='nature', seed}:{category?:Category; seed?:string}){
  const [src,setSrc] = useState<string>()
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(()=>{ getRandom('sound', category, seed).then(m=>setSrc(m.src)) },[category,seed])

  // Fallback: generate soft noise via WebAudio if file missing
  useEffect(()=>{
    if (!src) return
    const a = audioRef.current
    let ctx:AudioContext|undefined, node:AudioBufferSourceNode|undefined
    const onError = async ()=>{
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const buffer = ctx.createBuffer(1, ctx.sampleRate*2, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i=0;i<data.length;i++){ data[i] = (Math.random()*2-1) * 0.03 } // pink-ish noise
      node = ctx.createBufferSource(); node.buffer = buffer; node.loop = true
      const gain = ctx.createGain(); gain.gain.value = 0.2
      node.connect(gain).connect(ctx.destination); node.start()
      return ()=>{ node?.stop(); ctx?.close() }
    }
    a?.addEventListener('error', onError, { once:true })
    return ()=>{ a?.removeEventListener('error', onError) }
  },[src])

  return (
    <div className="flex items-center gap-2">
      <audio ref={audioRef} src={src} loop controls className="w-full rounded-xl"/>
    </div>
  )
}
