const CACHE_NAME = "codepolitan-reader-live-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/assets/img/codepolitan.png",
    "/js/main.js"
]

self.addEventListener("install", event => {
    console.log("ServiceWorker: Menginstall.");

    event.waitUntil(
        caches.open(CACHE_NAME).then( cache => {
            console.log("ServiceWorker: Membuka cache");
            return cache.addAll(urlsToCache);
        })
    )
})

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request, {cacheName: CACHE_NAME})
        .then( response => {
            if(response) {
                return response;
            }

            let fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                response => {
                    if(!response || response.status !== 200) {
                        return response;
                    }

                    let responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, responseToCache)
                    });

                    return response;
                }
            )
        })
    )
})

self.addEventListener('activate', event =>  {
    console.log('Aktivasi service worker baru');

    event.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName.startsWith("codepolitan-reader-lite")) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})