// Simple offline cache for PWA
const CACHE_NAME = 'Mi Cocina-v1';
const ASSETS = [
  '/', '/index.html', '/styles.css', '/app.js', '/manifest.json',
  '/data/menu.json',
  '/assets/icon-192.png','/assets/icon-256.png','/assets/icon-384.png','/assets/icon-512.png',
  '/assets/logo.svg','/assets/zelle-qr.svg'
];

self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k===CACHE_NAME?null:caches.delete(k)))));
});

self.addEventListener('fetch', (e)=>{
  const url = new URL(e.request.url);
  if(url.origin === location.origin){
    e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request)));
  }
});
