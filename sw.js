const CACHE='rotas-secure-v3.1';
const CORE=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
const LIBS=['https://unpkg.com/leaflet@1.9.4/dist/leaflet.css','https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];
self.addEventListener('install',e=>e.waitUntil((async()=>{
  const c=await caches.open(CACHE);
  await c.addAll(CORE);
  await Promise.allSettled(LIBS.map(u=>c.add(u)));
  await self.skipWaiting();
})()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  const isLeaflet=url.hostname==='unpkg.com'&&url.pathname.includes('/leaflet@1.9.4/dist/leaflet');
  if(url.origin!==self.location.origin&&!isLeaflet) return; // não intercepta buscas nem tiles externos do mapa
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
    if(r && (r.ok || r.type==='opaque')){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}
    return r;
  }).catch(()=>url.origin===self.location.origin?caches.match('./index.html'):Response.error())));
});
