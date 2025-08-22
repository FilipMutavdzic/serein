'use client'
import * as React from 'react'

export function Tabs({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }){
  const [value, setValue] = React.useState(defaultValue)
  return <div data-value={value}>{React.Children.map(children, (c: any)=> React.cloneElement(c, { value, setValue }))}</div>
}
export function TabsList({ children, value, setValue }: any){
  return <div className="flex gap-2 mb-2" role="tablist">
    {React.Children.map(children, (c:any)=> React.cloneElement(c, { value, setValue }))}
  </div>
}
export function TabsTrigger({ value: val, children, value, setValue }: any){
  const active=value===val
  return <button role="tab" aria-selected={active} onClick={()=>setValue(val)}
    className={`px-3 py-1 rounded-xl border text-sm ${active?'bg-brand text-white':'bg-white'}`}>{children}</button>
}
export function TabsContent({ value: val, children, value }: any){
  if (value!==val) return null
  return <div role="tabpanel">{children}</div>
}
