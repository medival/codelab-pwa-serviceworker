if (!("serviceWorker" in navigator)) {
    console.log("ServiceWorker: Browser tidak mendukung");
} else {
    navigator.serviceWorker
    .register("/sw.js")
    .then(function(registration) {
        console.log(
            "ServiceWorker: Pendaftaran berhasil. Scope :", registration.scope
        );
    })
    .catch(function(error) {
        console.error("ServiceWorker: Pendaftaran berhasil. Error :", error);
    });
}