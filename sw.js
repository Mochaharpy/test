// sw.js - The Master Bootstrapper
self.addEventListener('message', (event) => {
  if (event.data.type === 'INSTALL_USER_CODE') {
    // We store the Blob URL in a global variable
    self.userCodeUrl = event.data.url;
    
    // Import and execute the user's code immediately
    try {
      importScripts(self.userCodeUrl);
      console.log("User Service Worker code injected and running.");
    } catch (e) {
      console.error("Failed to load user script:", e);
    }
  }
});
self.addEventListener('fetch', (event) => {
  if (event.request.url.has("sw")) {
    event.respondWith(
     new Response(
       `self.addEventListener('install',e=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(clients.claim()));self.addEventListener('fetch',e=>e.request.url.includes('test-thing')&&e.respondWith(new Response('working')));`
                 "Content-Type": "application/javascript"
                 ) 
    )
  }
})
