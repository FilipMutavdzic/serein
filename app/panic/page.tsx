// app/panic/page.tsx
import { BreathPacer } from '@/components/BreathPacer'
import { Card } from '@/components/ui/Card'

export default function Panic() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Panic Reset</h1>
      <Card className="p-4">
        <p className="text-sm text-muted mb-2">
          Breathe with the ring. Inhale 4 • hold 4 • exhale 4 • hold 4.
        </p>
        <div className="flex justify-center">
          <BreathPacer mode="box" />
        </div>
      </Card>
    </div>
  )
}
