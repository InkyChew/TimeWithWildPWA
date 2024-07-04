const VERSION = "v1";
const CACHE_NAME = `timewithwild-tool-${VERSION}`;

const INITIAL_CACHED_RESOURCES = [
  '/',
  '/help.html',
  '/style.css',
  '/script.js',
  '/data.json'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(INITIAL_CACHED_RESOURCES);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(async response => {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone());
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});


// self.addEventListener('push', (event) => {
//   const notificationData = JSON.parse(event.data.text());

//   event.waitUntil((async () => {
//     self.registration.showNotification(notificationData.title, {
//       body: notificationData.message,
//       icon: notificationData.icon
//     });
//   })());
// });