
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : "Time's up! Wake up!",
        icon: './icon-192x192.png',
    };
    event.waitUntil(
        self.registration.showNotification("Alarm Notification", options)
    );
});
    