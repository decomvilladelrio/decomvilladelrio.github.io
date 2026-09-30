const CACHE_NAME = "ipuc-villa-del-rio-v110-podcast-stream";
const APP_SHELL = ["/", "/podcast/", "/manifest.webmanifest", "/css/styles.css", "/css/modern.css", "/css/platform-runtime.css", "/css/admin.css", "/css/home-hero.css", "/css/podcast.css", "/js/app.js", "/assets/logo.png", "/assets/favicon.png", "/assets/ipuc-villa-del-rio-brand.png", "/assets/historias-que-edifican.png", "/assets/earth/Tierra_Hero_preview.png", "/assets/og.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) return;
  const request = event.request;
  const url = new URL(request.url);
  if (request.destination === "video" || request.destination === "audio") return;
  if (url.pathname.endsWith("/assets/earth/tierra-ipuc.glb")) return;
  const isStatic = ["style", "script", "font", "manifest", "image"].includes(request.destination) || /\/assets\/(?:favicon|logo|og|historias|ipuc-villa-del-rio-brand)/.test(url.pathname);
  const isCode = ["style", "script"].includes(request.destination);
  event.respondWith(isStatic && !isCode ? cacheFirst(request) : networkFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) (await caches.open(CACHE_NAME)).put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok && response.type === "basic") (await caches.open(CACHE_NAME)).put(request, response.clone());
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") return (await caches.match("/")) || Response.error();
    return Response.error();
  }
}
