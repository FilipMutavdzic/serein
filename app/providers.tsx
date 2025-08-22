'use client'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '@/mdx-components'
import { useEffect } from 'react'

export default function Providers({ children }: { children: React.ReactNode }){
  useEffect(()=>{
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    document.documentElement.classList.toggle('reduced-motion', mq.matches)
    const onChange = (e: MediaQueryListEvent) =>
      document.documentElement.classList.toggle('reduced-motion', e.matches)
    mq.addEventListener?.('change', onChange)
    return ()=> mq.removeEventListener?.('change', onChange)
  },[])
  return <MDXProvider components={mdxComponents as any}>{children}</MDXProvider>
}
