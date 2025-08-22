// components/RandomArt.tsx
'use client';

import { useEffect, useState } from 'react'
import { getRandom, type Category } from '@/lib/media'

/**
 * RandomArt
 * - pulls a seeded image URL from lib/media (mock or Unsplash later)
 * - shows a soft gradient block while loading
 */
export default function RandomArt({
  category = 'nature',
  seed,
}: { category?: Category; seed?: string }) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    let ok = true
    getRandom('photo', category, seed).then(m => { if (ok) setSrc(m?.src ?? null) })
    return () => { ok = false }
  }, [category, seed])

  if (!src) {
    // loading / offline fallback
    return (
      <div
        aria-busy="true"
        className="aspect-video w-full rounded-2xl bg-gradient-to-br from-brand/20 to-brand2/30 animate-pulse"
      />
    )
  }

  return (
    <img
      src={src}
      alt={`art ${category}`}
      className="aspect-video w-full object-cover rounded-2xl"
      loading="lazy"
    />
  )
}
