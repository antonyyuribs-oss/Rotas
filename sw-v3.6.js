const CACHE='rotas-v3.6';
const CORE=['./','./index.html','./v36.html','./styles-v3.6.css?v=3.6','./app-v3.6.js?v=3.6','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
const LIBS=['https://unpkg.com/leaflet@1.9.4/dist/leaflet.css','https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];
self.addEventListener('install',e=>e.waitUntil((async()=>{
  const c=await caches.open(CACHE);
  await c.addAll(CORE);
  await Promise.allSettled(LIBS.map(u=>c.add(u)));
  await self.skipWaiting();
})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  const isLeaflet=url.hostname==='unpkg.com'&&url.pathname.includes('/leaflet@1.9.4/dist/leaflet');
  if(url.origin!==self.location.origin&&!isLeaflet)return;
  // Navegação e arquivos do app: rede primeiro para evitar ficar preso em versões antigas.
  if(url.origin===self.location.origin){
    e.respondWith((async()=>{
      try{
        const fresh=await fetch(e.request,{cache:'no-store'});
        if(fresh&&fresh.ok){const c=await caches.open(CACHE);c.put(e.request,fresh.clone());}
        return fresh;
      }catch(_){
        return (await caches.match(e.request)) || (await caches.match('./index.html'));
      }
    })());
    return;
  }
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;})));
});
