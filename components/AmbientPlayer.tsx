// components/AmbientPlayer.tsx
'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'

type Track = { id: string; title: string; src: string }
type Pack = 'ocean' | 'forest' | 'rain' | 'white-noise'

const TRACKS: Record<Pack, Track[]> = {
  ocean: [
    { id: 'o1', title: 'Ocean Waves',  src: '/sounds/ocean.mp3' },
    { id: 'o2', title: 'Shoreline',    src: '/sounds/shore.mp3' },
  ],
  forest: [
    { id: 'f1', title: 'Forest Birds', src: '/sounds/forest.mp3' },
    { id: 'f2', title: 'Deep Woods',   src: '/sounds/woods.mp3' },
  ],
  rain: [
    { id: 'r1', title: 'City Rain',    src: '/sounds/rain-city.mp3' },
    { id: 'r2', title: 'Tent Rain',    src: '/sounds/rain-tent.mp3' },
  ],
  'white-noise': [
    { id: 'w1', title: 'Brown Noise',  src: '/sounds/brown.mp3' },
    { id: 'w2', title: 'White Noise',  src: '/sounds/white.mp3' },
  ],
}

export default function AmbientPlayer({
  pack = 'ocean',
  autoStart = false,
  initialVolume = 0.35,
}: { pack?: Pack; autoStart?: boolean; initialVolume?: number }) {

  const list = useMemo(() => TRACKS[pack], [pack])
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [vol, setVol] = useState(initialVolume)
  const [pct, setPct] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const rafRef   = useRef<number | null>(null)  // <-- RAF id typed correctly

  // lazy-init audio element bound to current track
  function ensureAudio(): HTMLAudioElement {
    if (!audioRef.current) {
      const el = new Audio(list[idx].src)
      el.loop = true
      el.preload = 'auto'
      el.volume = vol
      audioRef.current = el
    }
    return audioRef.current
  }

  // volume changes
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = vol
  }, [vol])

  // progress ticker using RAF with proper cleanup
  useEffect(() => {
    const tick = () => {
      const el = audioRef.current
      if (el && isFinite(el.duration) && el.duration > 0) {
        setPct((el.currentTime / el.duration) * 100)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    // ✅ cleanup function (not a number)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  // optional autostart (requires user gesture in some browsers)
  useEffect(() => {
    if (autoStart) void play()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function play() {
    const a = ensureAudio()
    try { await a.play(); setPlaying(true) } catch { /* autoplay may be blocked */ }
  }
  function pause() {
    const a = ensureAudio()
    a.pause(); setPlaying(false)
  }

  async function next() {
    const a = ensureAudio()
    const n = (idx + 1) % list.length
    setIdx(n)
    a.pause()
    a.currentTime = 0
    a.src = list[n].src
    try { await a.play(); setPlaying(true) } catch { setPlaying(false) }
  }

  // cleanup on unmount
  useEffect(() => () => {
    audioRef.current?.pause()
    audioRef.current = null
  }, [])

  return (
    <div className="rounded-2xl border p-4 bg-card">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">{list[idx].title}</div>
          <div className="text-xs text-muted capitalize">{pack.replace('-', ' ')}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={next} aria-label="Next track">Next</Button>
          {playing
            ? <Button onClick={pause} aria-label="Pause">Pause</Button>
            : <Button onClick={play} aria-label="Play">Play</Button>}
        </div>
      </div>

      <div className="mt-3"><Progress value={pct} /></div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-muted w-12">Volume</span>
        <input
          type="range"
          min={0} max={1} step={0.05} value={vol}
          onChange={(e)=> setVol(parseFloat(e.target.value))}
          className="w-full accent-brand"
          aria-label="Ambient volume"
        />
      </div>

      {/* hidden audio element for a11y; controlled via ref */}
      <audio aria-hidden className="hidden" />
    </div>
  )
}
