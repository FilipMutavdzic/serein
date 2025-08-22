// app/relax/page.tsx
import RandomArt from '@/components/RandomArt'
import AmbientPlayer from '@/components/AmbientPlayer'

export default function Relax() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Relax</h1>
      <p className="text-sm text-muted">Art, sound, and a calm moment.</p>

      <div className="grid grid-cols-1 gap-3">
        <RandomArt />
        <AmbientPlayer />
      </div>
    </div>
  )
}
