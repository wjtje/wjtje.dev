import {
	checkCacheState,
	extractLangFromUrl,
	saveCacheData,
	translateCache,
	updateCacheState,
	type RemoteData
} from '$lib/api/helper';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from './$types';
import { fetchOsmData } from '$lib/api/osm';
import {
	getStreetCompleteImage,
	updateStreetCompleteCache
} from '$lib/api/getStreetCompleteDetails';
import { loadTranslations } from '$lib/i18n';
import { getMapCompleteImage, updateMapCompleteCache } from '$lib/api/getMapCompleteDetails';
import type { Changeset } from '$lib/@types/osm';

export const GET: RequestHandler = async ({ url }) => {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('osm');

	if (!cacheState) {
		console.log('[osm.json.ts]: Updating cache');

		// Fetch the data
		try {
			const responseChangesets = await fetchOsmData();

			await Promise.all([
				// Update streetComplete cache
				await updateStreetCompleteCache(),
				// Update MapComplete cache
				await updateMapCompleteCache()
			]);

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
						date: changeset.created_at,
						mainTitle: changeset.parsedTags.comment,
						subTitle: {
							id: 'OsmActivity.defaultText',
							data: {
								id: changeset.id,
								editor: changeset.parsedTags.created_by.name,
								version: changeset.parsedTags.created_by.version,
								location: changeset.geocodedLocation
							}
						}
					};

					// Generate correct data for each editor
					switch (changeset.parsedTags.created_by.name) {
						case 'MapComplete':
							data.mainTitle = {
								id: 'OsmActivity.editor.MapComplete.mainText',
								data: {
									theme: { type: 'MapCompleteTheme', data: changeset.parsedTags.theme },
									host: changeset.parsedTags.host
								}
							};
							data.subTitle = {
								id: determineMapCompleteString(changeset),
								data: {
									answer: changeset.parsedTags.answer,
									create: changeset.parsedTags.create,
									image: changeset.parsedTags['add-image'],
									id: changeset.id,
									version: changeset.parsedTags.created_by.version,
									location: changeset.geocodedLocation
								}
							};
							data.image = await getMapCompleteImage(changeset.parsedTags.theme);
							break;
						case 'StreetComplete':
							data.subTitle = {
								id: 'OsmActivity.editor.StreetComplete.subText',
								data: {
									id: changeset.id,
									version: changeset.parsedTags.created_by.version,
									location: changeset.geocodedLocation
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
			return new Response(JSON.stringify(await translateCache(id)), {
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}

	// Load the required translations
	await loadTranslations(extractLangFromUrl(url), '/api/osm');

	return new Response(JSON.stringify(await translateCache(id)), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

function determineMapCompleteString(changeset: Changeset): string {
	if (
		changeset.parsedTags.answer &&
		changeset.parsedTags.create &&
		changeset.parsedTags['add-image']
	) {
		return 'OsmActivity.editor.MapComplete.subText.all';
	} else if (changeset.parsedTags.answer && changeset.parsedTags.create) {
		return 'OsmActivity.editor.MapComplete.subText.answerAndCreate';
	} else if (changeset.parsedTags.answer && changeset.parsedTags['add-image']) {
		return 'OsmActivity.editor.MapComplete.subText.answerAndImage';
	} else if (changeset.parsedTags.create && changeset.parsedTags['add-image']) {
		return 'OsmActivity.editor.MapComplete.subText.createAndImage';
	} else if (changeset.parsedTags.create) {
		return 'OsmActivity.editor.MapComplete.subText.create';
	} else if (changeset.parsedTags.answer) {
		return 'OsmActivity.editor.MapComplete.subText.answer';
	} else if (changeset.parsedTags['add-image']) {
		return 'OsmActivity.editor.MapComplete.subText.image';
	}
	return 'OsmActivity.editor.MapComplete.subText.default';
}
