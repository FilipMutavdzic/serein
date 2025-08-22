// lib/store.ts (Zustand + local persistence)
'use client'
import { create } from 'zustand'

type Entry = { id:string; text:string; ts:number }
type Fav = { id:string; label:string; preset:string }

type State = {
  mood?: string
  setMood: (m?:string)=>void
  journal: Entry[]
  addEntry: (text:string)=>void
  favorites: Fav[]
  toggleFavorite: (fav: Fav)=>void
}

const persist = <T,>(key:string, initial:T):[()=>T,(v:T)=>void]=>{
  const get = ()=> {
    if (typeof window==='undefined') return initial
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? initial }
    catch { return initial }
  }
  const set = (v:T)=>{ try { localStorage.setItem(key, JSON.stringify(v)) } catch{} }
  return [get,set]
}

const [getMood, setMoodPersist] = persist('serein:mood', undefined as string|undefined)
const [getJournal, setJournalPersist] = persist('serein:journal', [] as Entry[])
const [getFavs, setFavsPersist] = persist('serein:favs', [] as Fav[])

export const useStore = create<State>((set,get)=>({
  mood: typeof window==='undefined' ? undefined : getMood(),
  setMood: (m)=> set(()=>{ setMoodPersist(m as any); return { mood:m }}),
  journal: typeof window==='undefined' ? [] : getJournal(),
  addEntry: (text)=>{
    const entry = { id:crypto.randomUUID(), text, ts: Date.now() }
    const next = [entry, ...get().journal]
    setJournalPersist(next); set({ journal: next })
  },
  favorites: typeof window==='undefined' ? [] : getFavs(),
  toggleFavorite: (fav)=>{
    const exists = get().favorites.find(f=>f.id===fav.id)
    const next = exists ? get().favorites.filter(f=>f.id!==fav.id) : [fav, ...get().favorites]
    setFavsPersist(next); set({ favorites: next })
  },
}))
