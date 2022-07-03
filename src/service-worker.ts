/// <reference lib="webworker" />
import { build, files, version } from '$service-worker';

self.addEventListener('install', (event: ExtendableEvent) => {
	event.waitUntil(async () => {
		// Delete old cache
		const names = await caches.keys();
		for (const name of names) {
			await caches.delete(name);
		}

		// Cache all static files
		const cache = await caches.open(`${version}-static`);
		cache.addAll(build);
		cache.addAll(files);
	});
});

const fetchCacheFirst = async (request: Request) => {
	// Get from cache
	const responseFromCache = await caches.match(request);
	if (responseFromCache) {
		return responseFromCache;
	}
	// Get from network
	const responseFromServer = await fetch(request);
	// Cache static assets
	if (request.url.match(/\.(js|css|html|ico|png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot)$/)) {
		const cache = await caches.open(`${version}-dynamic`);
		const responseToCache = responseFromServer.clone();
		cache.put(request, responseToCache);
	}
	return responseFromServer;
};

self.addEventListener('fetch', (event: FetchEvent) => {
	event.respondWith(fetchCacheFirst(event.request));
});
