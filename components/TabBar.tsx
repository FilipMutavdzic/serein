'use client'
import Link from 'next/link'; import { usePathname } from 'next/navigation'
const items=[
  {href:'/',label:'Home'},{href:'/tools',label:'Tools'},{href:'/sanctuary',label:'Sanctuary'},
  {href:'/yoga',label:'Yoga'},{href:'/media',label:'Media'},{href:'/journal',label:'Journal'},
  {href:'/planner',label:'Planner'},{href:'/happiness',label:'Happiness'}
]
export function TabBar(){
  const pathname=usePathname()
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur border-t">
      <ul className="grid grid-cols-8 text-[11px]">
        {items.map(i=>{
          const active=pathname===i.href || pathname.startsWith(i.href+'/')
          return (
            <li key={i.href} className="text-center">
              <Link href={i.href} className={`block p-2 ${active?'text-brand font-medium':'text-muted'}`}>{i.label}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
