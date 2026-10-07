const CACHE_NAME = "ipuc-villa-del-rio-v115-leaders-auth";
const SHELL = ["/", "/membresia/", "/membresia/decom/", "/lideres/", "/manifest.webmanifest", "/membresia/decom/manifest.webmanifest", "/css/styles.css", "/css/modern.css", "/css/platform-runtime.css", "/css/admin.css", "/css/home-hero.css", "/css/podcast.css", "/css/resources.css", "/css/membership-decom.css", "/css/committee-panel.css", "/js/app.js", "/js/member-profile.js", "/js/decom-store.js", "/js/decom-registration.js", "/js/committee-panel.js", "/js/vendor/supabase-2.57.4.js", "/assets/logo.png", "/assets/favicon.png", "/assets/ipuc-villa-del-rio-brand.png", "/assets/historias-que-edifican.png", "/assets/earth/Tierra_Hero_preview.png"];
const publicAsset = path => /^\/(?:css\/[\w.-]+\.css|js\/(?:[\w.-]+\.js|vendor\/supabase-2\.57\.4\.js))$/.test(path) || SHELL.includes(path);
SHELL.push("/cuenta/", "/js/user-account.js", "/css/user-account.css");
SHELL.push("/js/committee-panel.js", "/css/committee-panel.css");
SHELL.push("/instalar/", "/js/app-install.js", "/css/app-install.css");
self.addEventListener("install", e => {e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(SHELL)));});
// Never interrupt a form with a forced worker upgrade.
self.addEventListener("message",e=>{if(e.data==="ACTIVATE_UPDATE")self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith("ipuc-villa-del-rio-")&&k!==CACHE_NAME)await caches.delete(k);await self.clients.claim();})());});
self.addEventListener("fetch",e=>{
  const req=e.request,url=new URL(req.url);
  if(req.method!=="GET"||url.origin!==self.location.origin)return;
  if(req.mode==="navigate") {e.respondWith((async()=>{try{return await fetch(req);}catch{const cache=await caches.open(CACHE_NAME);return await cache.match(url.pathname.startsWith("/membresia/decom")?"/membresia/decom/":url.pathname.startsWith("/membresia")?"/membresia/":url.pathname.startsWith("/cuenta")?"/cuenta/":url.pathname.startsWith("/instalar")?"/instalar/":"/")||Response.error();}})());return;}
  // Private photos, uploads and API/member responses never enter Cache Storage.
  if(!publicAsset(url.pathname))return;
  e.respondWith((async()=>{const cache=await caches.open(CACHE_NAME);try{const response=await fetch(req);if(response.ok&&response.type==="basic")await cache.put(url.pathname,response.clone());return response;}catch{return await cache.match(url.pathname)||Response.error();}})());
});
