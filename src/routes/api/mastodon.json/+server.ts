import type { ActivityStreams } from '$lib/@types/activitypub';
import {
	checkCacheState,
	extractLangFromUrl,
	saveCacheData,
	translateCache,
	updateCacheState,
	type RemoteData
} from '$lib/api/helper';
import { loadTranslations } from '$lib/i18n';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('mastodon');

	if (!cacheState) {
		console.log('[mastodon.json.ts]: Updating cache');

		try {
			// Remove old cache
			await prisma.remoteData.deleteMany({
				where: {
					remoteSource: {
						name: 'mastodon'
					}
				}
			});

			let toots = (await (
				await fetch(`https://social.wjtje.dev/users/wjtje/outbox?page=true`, {
					headers: {
						Accept: 'application/activity+json'
					}
				})
			).json()) as ActivityStreams;

			// Determine all activity types
			let activityTypes = toots.orderedItems.map((item) => item.type);

			// Keep going to next page if activity types don't include Create
			while (!activityTypes.includes('Create')) {
				const next = toots.next;

				if (next) {
					toots = (await (
						await fetch(next, {
							headers: {
								Accept: 'application/activity+json'
							}
						})
					).json()) as ActivityStreams;

					// Determine all activity types
					activityTypes = toots.orderedItems.map((item) => item.type);
				} else {
					console.log('[mastodon.json.ts]: Error while updating cache, no next page');
					return new Response(JSON.stringify(await translateCache(id)), {
						status: 500
					});
				}
			}

			if (activityTypes.includes('Create')) {
				const itemIndex = activityTypes.indexOf('Create');
				const toot: ActivityStreams['orderedItems'][0] = toots.orderedItems[itemIndex];

				if (typeof toot.object !== 'string') {
					const data: RemoteData = {
						// TODO: Hacky way to remove HTML tags from the content
						mainTitle: toot.object.content.replace(/(<([^>]+)>)/gi, ''),
						date: toot.published
						// TODO: We should also add the accessibility text to the image
						// image: toot.object.attachment[0].url || null
					};

					// Save the data to the database
					await saveCacheData(data, id);

					// Update the cache state
					await updateCacheState(id);
				} else {
					console.log('[mastodon.json.ts]: Error while updating cache, toot object is a string');
					return new Response(JSON.stringify(await translateCache(id)), {
						status: 500
					});
				}
			}
		} catch (error) {
			console.log('[mastodon.json.ts]: Error while updating cache', error);
			return new Response(JSON.stringify(await translateCache(id)), {
				status: 500
			});
		}
	}

	// Load the required translations
	await loadTranslations(extractLangFromUrl(url), '/api/osm');

	return new Response(JSON.stringify(await translateCache(id)));
};
