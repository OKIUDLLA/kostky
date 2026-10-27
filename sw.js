// Kostky offline: aplikace se uloží do telefonu a funguje i bez signálu.
// Stránka se bere nejdřív z internetu (nová verze hned). Bez signálu, nebo když síť do 3 s neodpoví
// (slabý signál), se ukáže uložená verze a nová se uloží na příště.
const CACHE = "kostky-v2";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./fonts/bricolage-grotesque.woff2",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.svg",
  "./icons/favicon-32.png",
];
const NET_WAIT = 3000;

self.addEventListener("install", e => {
  // reload: soubory přímo ze serveru, ne z mezipaměti prohlížeče (jinak by se mohla uložit stará verze)
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
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
    // no-cache: prohlížeč se vždy zeptá serveru, jestli není nová verze (bez čekání na vypršení cache)
    // uloží se jen samotná appka (./ nebo ./index.html), ne jiný soubor otevřený jako stránka
    const path = new URL(req.url).pathname, scope = new URL(self.registration.scope).pathname;
    const isApp = path === scope || path === scope + "index.html";
    const net = fetch(req, { cache: "no-cache" }).then(res => {
      if (!res.ok || !isApp || !(res.headers.get("content-type") || "").includes("text/html")) return res;
      const copy = res.clone();
      return caches.open(CACHE).then(c => c.put("./index.html", copy)).then(() => res, () => res);
    });
    e.waitUntil(net.catch(() => {}));   // stažení doběhne a uloží se, i když se mezitím ukázala uložená verze
    e.respondWith(caches.match("./index.html").then(r => r || caches.match("./")).then(cached => {
      if (!cached) return net;
      const late = new Promise(done => setTimeout(() => done(cached), NET_WAIT));
      return Promise.race([net.then(res => (res.ok || res.type === "opaqueredirect" ? res : cached), () => cached), late]);
    }));
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
