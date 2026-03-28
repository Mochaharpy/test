self.addEventListener('message', (event) => {
  if (event.data.type === 'INSTALL_USER_CODE') {
    self.userCodeUrl = event.data.url;
    try {
      importScripts(self.userCodeUrl);
      console.log("User Service Worker code injected and running.");
    } catch (e) {
      console.error("Failed to load user script:", e);
    }
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes("sw")) {
    event.respondWith(
      new Response(
        "self.addEventListener('install',e=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(clients.claim()));self.addEventListener('fetch',e=>e.request.url.includes('test-thing')&&e.respondWith(new Response('working')));",
        { headers: { "Content-Type": "application/javascript" } }
      )
    );
  }
});
