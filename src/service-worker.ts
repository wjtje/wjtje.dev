/// <reference lib="webworker" />
import { build, files, version } from '$service-worker';

const applicationCache = `applicationCache-v${version}`;
const staticCache = `staticCache-v${version}`;
const dynamicCache = `dynamicCache-v${version}`;

// Remove old cache
self.addEventListener('activate', (event: ExtendableEvent) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.filter((key) => !key.endsWith(version)).map((key) => caches.delete(key))
			);
		})
	);
});

// Fetch static files
self.addEventListener('install', (event: ExtendableEvent) => {
	event.waitUntil(
		Promise.all([
			caches.open(applicationCache).then((cache) => cache.addAll(build)),
			caches.open(staticCache).then((cache) => cache.addAll(files))
		])
	);
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
		const cache = await caches.open(dynamicCache);
		const responseToCache = responseFromServer.clone();
		cache.put(request, responseToCache);
	}
	return responseFromServer;
};

self.addEventListener('fetch', (event: FetchEvent) => {
	event.respondWith(fetchCacheFirst(event.request));
});
