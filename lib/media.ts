// lib/media.ts (pluggable providers + deterministic shuffle)
'use client'
import { seeded, pick } from './random'

export type MediaKind = 'photo'|'sound'|'video'
export type Category = 'nature'|'ocean'|'city-rain'|'forest'|'sunrise'
export type MediaItem = { kind:MediaKind; src:string; alt?:string; loop?:boolean; mute?:boolean }

const provider = process.env.NEXT_PUBLIC_MEDIA_PROVIDER || 'mock'

// ---- Mock data: generated from gradients & small loops; no keys needed
const mockPhotos: Record<Category,string[]> = {
  nature:['/media/photo-nature-1.jpg','/media/photo-nature-2.jpg'],
  ocean:['/media/photo-ocean-1.jpg'],
  'city-rain':['/media/photo-city-1.jpg'],
  forest:['/media/photo-forest-1.jpg'],
  sunrise:['/media/photo-sunrise-1.jpg'],
}
// Tiny silent mp3 / white-noise synth fallback handled in component if file missing
const mockSounds: Record<Category,string[]> = {
  nature:['/media/sound-nature-1.mp3'],
  ocean:['/media/sound-ocean-1.mp3'],
  'city-rain':['/media/sound-rain-1.mp3'],
  forest:['/media/sound-forest-1.mp3'],
  sunrise:['/media/sound-soft-1.mp3'],
}
const mockVideos: Record<Category,string[]> = {
  nature:['/media/video-leaves-1.mp4'],
  ocean:['/media/video-waves-1.mp4'],
  'city-rain':['/media/video-rain-1.mp4'],
  forest:['/media/video-forest-1.mp4'],
  sunrise:['/media/video-sunrise-1.mp4'],
}

export function deterministicSeed(key?:string){
  const d = new Date()
  const bucket = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}-${d.getHours()}`
  return `${key||''}|${bucket}`
}

export async function getRandom(kind:MediaKind, category:Category, seedKey?:string):Promise<MediaItem>{
  const seed = deterministicSeed(seedKey)
  const rng = seeded(`${provider}:${kind}:${category}:${seed}`)
  if (provider==='mock'){
    if (kind==='photo'){
      const src = pick(rng, mockPhotos[category] ?? Object.values(mockPhotos).flat())
      return { kind:'photo', src, alt:`${category} photo` }
    }
    if (kind==='sound'){
      const src = pick(rng, mockSounds[category] ?? Object.values(mockSounds).flat())
      return { kind:'sound', src, loop:true }
    }
    const src = pick(rng, mockVideos[category] ?? Object.values(mockVideos).flat())
    return { kind:'video', src, loop:true, mute:true }
  }
  // Real providers (keys later) — stubs that return placeholder until keys set
  return { kind, src:'/media/placeholder.mp4', loop:true, mute: kind==='video' }
}
