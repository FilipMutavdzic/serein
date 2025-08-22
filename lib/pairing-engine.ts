// lib/pairing-engine.ts
import packs from '@/content/sanctuary-packs.json'
import { seeded, pick } from './random'
import type { Category, MediaItem } from './media'

type Mood = '😌'|'🙂'|'😐'|'😟'|'😣'|undefined
type Context = { hour:number; location?:string }

export type Pairing = {
  breath: 'one-breath'|'box'|'478'
  mantra: string
  category: Category
  video?: MediaItem
  photo?: MediaItem
  sound?: MediaItem
  durationSec: number
}

export function makeContext(): Context {
  const d = new Date()
  return { hour: d.getHours() }
}

export function pair(mood: Mood, ctx: Context, seedKey: string){
  // Deterministic but fresh per hour
  const rng = seeded(`${mood||'neutral'}|${ctx.hour}|${seedKey}`)
  const pack = pick(rng, packs.packs)
  const category = pick(rng, pack.categories as Category[])
  const breath: Pairing['breath'] = pick(rng, ['one-breath','box','478'])
  const durationSec = pick(rng, [30,45,60,90,120])
  const mantra = pick(rng, pack.mantras)
  const [video, photo, sound] = [
    pick(rng, pack.videos.map(src=>({kind:'video',src,loop:true,mute:true}))),
    pick(rng, pack.images.map(src=>({kind:'photo',src}))),
    pick(rng, pack.sounds.map(src=>({kind:'sound',src,loop:true}))),
  ] as unknown as [MediaItem, MediaItem, MediaItem]
  return { breath, mantra, category, video, photo, sound, durationSec }
}
