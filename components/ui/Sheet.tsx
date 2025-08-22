'use client'
import { useState } from 'react'
export function Sheet({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }){
  const [open,setOpen]=useState(false)
  return (<>
    <div onClick={()=>setOpen(true)}>{trigger}</div>
    {open && (
      <div className="fixed inset-0 bg-black/30" onClick={()=>setOpen(false)}>
        <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl p-4" onClick={e=>e.stopPropagation()}>
          <div className="h-1.5 w-10 bg-black/10 rounded-full mx-auto mb-3" />
          {children}
        </div>
      </div>
    )}
  </>)
}
