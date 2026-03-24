let userCode = "";

self.addEventListener('message', (event) => {
  if (event.data.type === 'SET_CODE') {
    userCode = event.data.code;
    event.ports[0].postMessage('READY');
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // When bridge-sw.js calls importScripts('./virtual-logic.js')
  // the Parent SW catches it here:
  if (url.pathname.endsWith('virtual-logic.js')) {
    event.respondWith(
      new Response(userCode, {
        headers: { 'Content-Type': 'application/javascript' }
      })
    );
  }
});
