/// <reference lib="WebWorker" />

let virtualWorkerCode = "";

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('message', (event) => {
  if (event.data.type === 'REGISTER_VIRTUAL_SW') {
    // Store the code from the textarea
    virtualWorkerCode = event.data.code;
    event.ports?.[0]?.postMessage('READY');
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // We intercept a specific virtual name inside the /test/ path
  if (url.pathname.endsWith('/test/virtual-worker.js')) {
    event.respondWith(
      new Response(virtualWorkerCode, {
        headers: {
          'Content-Type': 'application/javascript',
          // Crucial: Tells the browser this worker is allowed 
          // to handle the /test/ scope
          'Service-Worker-Allowed': '/test/'
        }
      })
    );
  }
});
