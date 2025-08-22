// app/sw.js
/* Basic offline shell + sanctuary pack cache */
const CACHE = 'serein-v1'
const ASSETS = [
  '/', '/manifest.webmanifest',
  '/icons/icon-192.png','/icons/icon-512.png',
  '/_next/static/chunks/webpack.js' // Next will update this; SW tolerates misses
]
const DATA = ['/content/sanctuary-packs.json','/content/advice.json']

self.addEventListener('install', e=>{
  e.waitUntil((async()=>{
    const c = await caches.open(CACHE)
    await c.addAll([...ASSETS, ...DATA].filter(Boolean))
    self.skipWaiting()
  })())
})

self.addEventListener('activate', e=>e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url)
  if (url.origin === location.origin) {
    // App shell: network first for pages, cache first for static/data
    if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/content/')) {
      e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)))
      return
    }
  }
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))
})
