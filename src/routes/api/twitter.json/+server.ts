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

interface TweetData {
	data: Tweet[];
	meta: {
		newest_id: string;
		oldest_id: string;
		result_count: number;
		next_token: string;
	};
}

interface Tweet {
	edit_history_tweet_ids: string[];
	id: string;

	/**
	 * The text of the tweet
	 */
	text: string;

	/**
	 * The date the tweet was created
	 */
	created_at: Date;
}

export const GET: RequestHandler = async ({ url }) => {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('twitter');

	if (!cacheState) {
		console.log('[twitter.json.ts]: Updating cache');

		try {
			// Remove old cache
			await prisma.remoteData.deleteMany({
				where: {
					remoteSource: {
						name: 'twitter'
					}
				}
			});

			// Fetching the last 5 tweets from the Twitter API, even though we only need the first one, because the API doesn't allow to fetch only one tweet but requires at least 5
			const tweets = (await (
				await fetch(
					`https://api.twitter.com/2/users/807506429217296384/tweets?max_results=5&tweet.fields=created_at&exclude=retweets,replies`,
					{
						headers: {
							Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
						}
					}
				)
			).json()) as TweetData;

			const data: RemoteData = {
				mainTitle: tweets.data[0].text,
				date: tweets.data[0].created_at
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
