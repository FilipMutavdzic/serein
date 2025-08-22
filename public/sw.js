const CACHE='serein-v1';
const APP_SHELL=[
  '/', '/manifest.webmanifest',
  '/icons/icon-192.png','/icons/icon-512.png',
  '/media/packs.json',
  '/media/images/gradient-1.png','/media/images/gradient-2.png','/media/images/gradient-3.png'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL))); self.skipWaiting()
});
self.addEventListener('activate',e=>{ e.waitUntil(self.clients.claim()) });
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(APP_SHELL.includes(url.pathname)||url.pathname.startsWith('/_next/')||url.pathname.startsWith('/media/')){
    e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request).then(r=>{
      const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return r;
    })))
  }
});
