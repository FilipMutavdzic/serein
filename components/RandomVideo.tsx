// components/media/RandomVideo.tsx
'use client'
import { useEffect, useState } from 'react'
import { getRandom, type Category } from '@/lib/media'

export function RandomVideo({category='nature', seed}:{category?:Category; seed?:string}){
  const [src,setSrc] = useState<string>()
  useEffect(()=>{ getRandom('video', category, seed).then(m=>setSrc(m.src)) },[category,seed])
  if (!src) return <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-accent/30 to-brand/20 animate-pulse"/>
  return (
    <video src={src} className="aspect-video w-full rounded-2xl" autoPlay muted loop playsInline />
  )
}
