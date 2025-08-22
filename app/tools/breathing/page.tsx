// app/tools/breathing/page.tsx
'use client'
import { useState } from 'react'
import { BreathPacer } from '@/components/breathing/BreathPacer'
import { Button, Tabs, TabList, Tab, TabPanels, TabPanel, Card } from '@/components/ui'

export default function Breathing(){
  const [tab, setTab] = useState(0)
  const modes = ['box','478','custom'] as const
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Breathing</h1>
      <Tabs>
        <TabList>
          {['Box','4-7-8','Custom'].map((t,i)=>(
            <Tab key={t} selected={tab===i} onSelect={()=>setTab(i)}>{t}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {modes.map((m,i)=>(
            <TabPanel key={m} hidden={tab!==i}>
              <Card className="p-4">
                <BreathPacer mode={m} seconds={60}/>
                <div className="mt-3 text-sm text-muted">
                  {m==='box' && 'In 4 — Hold 4 — Out 4 — Hold 4'}
                  {m==='478' && 'In 4 — Hold 7 — Out 8'}
                  {m==='custom' && 'Gentle inhale/exhale/rest'}
                </div>
              </Card>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <Button onClick={()=>navigator.vibrate?.(20)} variant="secondary">Haptic tick (test)</Button>
    </div>
  )
}
