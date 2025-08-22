import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { TabBar } from '@/components/TabBar'
import Providers from './providers'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Serein – Pocket Calm',
  description: 'Ultra-short stress relief rituals for busy moments.',
  themeColor: '#ffffff',
  manifest: '/manifest.webmanifest',
  icons: [
    { rel:'icon', url:'/icons/icon-192.png' },
    { rel:'apple-touch-icon', url:'/icons/icon-192.png' }
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-bg text-text antialiased">
        <Providers>
          <div className="mx-auto max-w-md min-h-dvh flex flex-col">
            <Header />
            <main className="flex-1 p-4 pb-28">{children}</main>
            {(process.env.NEXT_PUBLIC_MEDIA_PROVIDER === 'unsplash' || process.env.NEXT_PUBLIC_UNSPLASH_KEY) ? (
              <div className="text-center text-[11px] text-muted pb-2">
                Photos via <a className="underline" href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a>
              </div>
            ) : null}
            <Suspense><TabBar /></Suspense>
          </div>
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker'in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(console.error);});}`
          }}
        />
      </body>
    </html>
  )
}
