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
        caches.match(event.request).then(function(response){
            console.log("ServiceWorker: fetch data from : ", event.request.url);

            if (response) {
                console.log("serviceWorker: using asset from cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Loading asset from : ",
                event.request.url
            );
            return fetch(event.request);
        })
    )
})