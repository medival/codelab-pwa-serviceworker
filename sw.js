const CACHE_NAME = "codepolitan-reader-live-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/assets/img/codepolitan.png",
    "/js/main.js"
]

self.addEventListener("install", function(event) {
    console.log("ServiceWorker: Menginstall.");

    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log("ServiceWorker: Membuka cache");
            return cache.addAll(urlsToCache);
        })
    )
})

self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request, {cacheName: CACHE_NAME})
        .then(function(response) {
            if(response) {
                return response;
            }

            let fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    if(!response || response.status !== 200) {
                        return response;
                    }

                    let responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(event.request, responseToCache)
                    });

                    return response;
                }
            )
        })
    )
})

self.addEventListener('activate', function (event) {
    console.log('Aktivasi service worker baru');

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME && cacheName.startsWith("codepolitan-reader-lite")) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})