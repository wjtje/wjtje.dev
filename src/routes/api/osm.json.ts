import {
	checkCacheState,
	getCacheData,
	saveCacheData,
	updateCacheState,
	type RemoteData
} from '$lib/api/helper';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from './__types/osm.json';
import { fetchOsmData } from '$lib/api/osm';
import {
	getStreetCompleteImage,
	updateStreetCompleteCache
} from '$lib/api/getStreetcompleteDetails';

export const get: RequestHandler = async () => {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('osm');

	if (!cacheState) {
		console.log('[osm.json.ts]: Updating cache');

		// Fetch the data
		try {
			const responseChangesets = await fetchOsmData();

			// Update streetComplete cache
			await updateStreetCompleteCache();

			// Remove old cache
			await prisma.remoteData.deleteMany({
				where: {
					remoteSource: {
						name: 'osm'
					}
				}
			});

			// Save the data in the cache
			await Promise.all(
				responseChangesets.map(async (changeset) => {
					// Create base object
					const data: RemoteData = {
						date: changeset['@_created_at'],
						mainTitle: changeset.parsedTags.comment,
						subTitle: {
							id: 'OsmActivity.defaultText',
							data: {
								id: changeset['@_id'],
								editor: changeset.parsedTags.created_by.name,
								version: changeset.parsedTags.created_by.version
							}
						}
					};

					// Generate correct data for each editor
					switch (changeset.parsedTags.created_by.name) {
						case 'MapComplete':
							data.mainTitle = {
								id: 'OsmActivity.editor.MapComplete.mainText',
								data: {
									count: changeset.parsedTags.answer,
									theme: changeset.parsedTags.theme,
									host: changeset.parsedTags.host
								}
							};
							data.subTitle = {
								id: 'OsmActivity.editor.MapComplete.subText',
								data: {
									id: changeset['@_id'],
									version: changeset.parsedTags.created_by.version
								}
							};
							break;
						case 'StreetComplete':
							data.subTitle = {
								id: 'OsmActivity.editor.StreetComplete.subText',
								data: {
									id: changeset['@_id'],
									version: changeset.parsedTags.created_by.version
								}
							};
							data.image = await getStreetCompleteImage(
								changeset.parsedTags['StreetComplete:quest_type']
							);
							break;
					}

					// Save object inside database
					await saveCacheData(data, id);
				})
			);

			// Update the cache state
			await updateCacheState(id);
		} catch {
			return {
				status: 500,
				...(await getCacheData(id))
			};
		}
	}

	return await getCacheData(id);
};
