'use client';
import { useEffect, useState } from 'react'
import { getRandom, type Category } from '@/lib/media'

export default function RandomArt({ category = 'nature', seed }: { category?: Category; seed?: string }) {
  const [src, setSrc] = useState<string | null>(null)
  useEffect(() => {
    let ok = true
    getRandom('photo', category, seed).then(m => { if (ok) setSrc(m?.src ?? null) })
    return () => { ok = false }
  }, [category, seed])
  if (!src) return <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-brand/20 to-brand2/30 animate-pulse" />
  return <img src={src} alt={`art ${category}`} className="aspect-video w-full object-cover rounded-2xl" loading="lazy" />
}
