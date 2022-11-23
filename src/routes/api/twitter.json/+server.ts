import {
	checkCacheState,
	extractLangFromUrl,
	saveCacheData,
	translateCache,
	updateCacheState,
	type RemoteData
} from '$lib/api/helper';
import type { RequestHandler } from './$types';
import { loadTranslations } from '$lib/i18n';

export const GET: RequestHandler = async ({ url }) => {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('twitter');

	if (!cacheState) {
		console.log('[twitter.json.ts]: Updating cache');

		try {
			const tweets = await (
				await fetch(`https://api.twitter.com/2/users/807506429217296384/tweets?max_results=5`, {
					headers: {
						Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
					}
				})
			).json();

			const data: RemoteData = {
				mainTitle: tweets.data[0].text
			};

			// Save the data to the database
			await saveCacheData(data, id);

			// Update the cache state
			await updateCacheState(id);
		} catch (error) {
			console.log('[twitter.json.ts]: Error while updating cache', error);
			return new Response(JSON.stringify(await translateCache(id)), {
				status: 500
			});
		}
	}

	// Load the required translations
	await loadTranslations(extractLangFromUrl(url), '/api/osm');

	return new Response(JSON.stringify(await translateCache(id)));
};
