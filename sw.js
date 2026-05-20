// Service Worker de auto-desinstalação.
// Para dispositivos que tinham o SW antigo cacheado, este script força a remoção.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((names) =>
        Promise.all(names.map((n) => caches.delete(n)))
      ),
      self.registration.unregister(),
      self.clients.matchAll().then((clients) =>
        clients.forEach((c) => c.navigate(c.url))
      ),
    ])
  );
});
