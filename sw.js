// Kostky offline: aplikace se uloží do telefonu a funguje i bez signálu.
// Stránka se bere vždy nejdřív z internetu (nová verze hned), bez signálu z paměti.
const CACHE = "kostky-v1";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./fonts/bricolage-grotesque.woff2",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.svg",
  "./icons/favicon-32.png",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); }
        return res;
      })
      .catch(() => caches.match("./index.html").then(r => r || caches.match("./"))));
    return;
  }
  // písmo, ikony: hned z paměti, na pozadí se obnoví
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
