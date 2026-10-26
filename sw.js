const C='planner-v1';
const X=['https://cdn.tailwindcss.com/3.4.17','https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js','https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js','https://cdn.jsdelivr.net/npm/@babel/standalone@7.24.7/babel.min.js'];
self.addEventListener('install',e=>{self.skipWaiting();
e.waitUntil(caches.open(C).then(c=>Promise.all([c.addAll(['./','index.html','manifest.json','icon-192.png','icon-512.png']),...X.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)))])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{});return res}).catch(()=>caches.match('index.html'))))});
