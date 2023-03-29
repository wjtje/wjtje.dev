import type { Status } from '$lib/@types/mastodon';
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
	const { id, cacheState } = await checkCacheState('pixey');

	if (!cacheState) {
		console.log('[pixey.json.ts]: Updating cache');

		try {
			// Remove old cache
			await prisma.remoteData.deleteMany({
				where: {
					remoteSource: {
						name: 'pixey'
					}
				}
			});

			const statuses = (await (
				await fetch(`${process.env.PIXELFED_URL}?limit=10`, {
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${process.env.PIXELFED_TOKEN}`
					}
				})
			).json()) as Status[];

			// Save the data in the cache
			await Promise.all(
				statuses.map(async (status) => {
					const data: RemoteData = {
						date: status.created_at,
						mainTitle: status.content,
						image: status.media_attachments[0]?.url,
						subTitle: status.media_attachments[0]?.description,
						url: status.url
					};

					// Save the data to the database
					await saveCacheData(data, id);
				})
			);

			// Update the cache state
			await updateCacheState(id);
		} catch (error) {
			console.log('[pixey.json.ts]: Error while updating cache', error);
			return new Response(JSON.stringify(await translateCache(id)), {
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}

	// Load the required translations
	await loadTranslations(extractLangFromUrl(url), '/api/pixey');

	return new Response(JSON.stringify(await translateCache(id)), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
