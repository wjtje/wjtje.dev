import type { RecentlyPlayedGames } from '$lib/@types/steam';
import {
	checkCacheState,
	extractLangFromUrl,
	saveCacheData,
	updateCacheState,
	translateCache,
	type RemoteData
} from '$lib/api/helper';
import { SteamUserID } from '$lib/common';
import { loadTranslations } from '$lib/i18n';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	// Load the required translations
	await loadTranslations(extractLangFromUrl(url), '/api/steam');

	// Get information about the cache
	const { id, cacheState } = await checkCacheState('steam');

	if (!cacheState) {
		console.log('[steam.json.ts]: Updating cache');

		// Get new JSON data from Steam
		try {
			const response = await fetch(
				`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${SteamUserID}&format=json`
			);
			const json: RecentlyPlayedGames = await response.json();

			if (response.status != 200) {
				throw 'Faulty response';
			}

			// Remove old cache
			await prisma.remoteData.deleteMany({
				where: {
					remoteSource: {
						name: 'steam'
					}
				}
			});

			// Save the data in the cache
			await Promise.all(
				json.response.games.map(async (game) => {
					// Create base object
					const data: RemoteData = {
						mainTitle: {
							id: 'SteamActivity.PlayedGameTitle',
							data: {
								appid: game.appid,
								name: game.name
							}
						},
						subTitle: {
							id: 'SteamActivity.PlayedGameSubTitle',
							data: {
								playtime_2weeks: game.playtime_2weeks
							}
						},
						image: `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
					};

					// Save object inside database
					await saveCacheData(data, id);
				})
			);

			// Update the cache state
			await updateCacheState(id);
		} catch {
			return new Response(JSON.stringify(await translateCache(id)), {
				status: 500
			});
		}
	}

	return new Response(JSON.stringify(await translateCache(id)));
};
