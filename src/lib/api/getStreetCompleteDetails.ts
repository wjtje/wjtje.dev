import { prisma } from '$lib/prisma';
import * as zipJs from '@zip.js/zip.js';
import Papa from 'papaparse';
import { checkCacheState, updateCacheState } from './helper';
import { githubAuth } from './helper';

/**
 * Gets the latest CSV file from the StreetComplete github page
 *
 * @returns {string} The CSV data file
 */
async function getStreetCompleteCSV() {
	const repo = 'streetcomplete/StreetComplete';

	console.log('[getStreetCompleteDetails.ts]: Start download');

	// Get latest workflow run_id
	const run_id =
		(
			await (
				await fetch(
					`https://api.github.com/repos/${repo}/actions/workflows/generate-quest-list.yml/runs?status=success&per_page=1`
				)
			).json()
		)?.workflow_runs[0]?.id ?? 0;

	console.log(`[getStreetCompleteDetails.ts]: Got run id: ${run_id}`);

	// Get workflow artifacts
	const artifact_id = (
		await (
			await fetch(`https://api.github.com/repos/${repo}/actions/runs/${run_id}/artifacts`)
		).json()
	)?.artifacts[0]?.id;

	console.log(`[getStreetCompleteDetails.ts]: Got artifact id: ${artifact_id}`);

	// Download artifact zip
	const artifact_zip = await (
		await fetch(`https://api.github.com/repos/${repo}/actions/artifacts/${artifact_id}/zip`, {
			headers: {
				Authorization: githubAuth()
			}
		})
	).blob();

	console.log(`[getStreetCompleteDetails.ts]: Got artifact with size: ${artifact_zip.size}`);

	// Extract the zip file
	const zip = new zipJs.ZipReader(new zipJs.BlobReader(artifact_zip));
	const zip_entries = await zip.getEntries();
	const data = await zip_entries
		.find((entry) => entry.filename == 'quest-list.csv')
		.getData(new zipJs.TextWriter(), {
			useWebWorkers: false
		});

	if (data == null) {
		console.warn(`[GetStreetCompleteDetails.ts]: Could not find required file`);
	}

	console.log(`[getStreetCompleteDetails.ts]: Got data with size: ${data.length}`);

	return data;
}

/**
 * This function will update the StreetComplete cache
 */
export async function updateStreetCompleteCache() {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('streetcomplete');

	if (!cacheState) {
		console.log('[getStreetCompleteDetails.ts]: Updating cache');

		try {
			const csv = await getStreetCompleteCSV();
			const parsedCsv = Papa.parse(csv);

			// Remove old cache
			await prisma.streetCompleteQuest.deleteMany();

			// Save new data in the cache
			await Promise.all(
				parsedCsv.data.map(async (row) => {
					if (row[0] != '' && row[0] != '???' && row[0] != 'Quest Name') {
						await prisma.streetCompleteQuest.create({
							data: {
								name: row[0],
								iconUrl: row[5].substr(2, row[5].length - 3)
							}
						});
					}
				})
			);

			// Update the cache state
			await updateCacheState(id);
		} catch (e) {
			console.warn('[getStreetCompleteDetails.ts]: Failed to update cache');
			console.log(e);
		}
	}
}

/**
 * Get a icon url from a quest name
 * @param quest The quest name
 * @returns {Promise<string|null>} A icon url
 */
export async function getStreetCompleteImage(quest: string): Promise<string | null> {
	// Check if the quest name ends in Overlay, if so use the overlay function
	// Currently these are not included in the quest list, so we have our own function for this
	if (quest.endsWith('Overlay')) {
		return getStreetCompleteOverlayImage(quest);
	}

	return (
		await prisma.streetCompleteQuest.findFirst({
			where: {
				name: quest
			}
		})
	)?.iconUrl;
}

/**
 * Get an icon url from an overlay name
 * @param overlay The overlay name
 * @returns {Promise<string|null>} A icon url
 */
export async function getStreetCompleteOverlayImage(overlay: string): Promise<string | null> {
	// Currently these are not included in the quest list, so we have our own mapping for some of them
	const overlayMapping = {
		WayLitOverlay:
			'https://raw.githubusercontent.com/streetcomplete/StreetComplete/refs/heads/master/res/graphics/quest/lantern.svg',
		SurfaceOverlay:
			'https://raw.githubusercontent.com/streetcomplete/StreetComplete/refs/heads/master/res/graphics/quest/street_surface.svg',
		SidewalkOverlay:
			'https://raw.githubusercontent.com/streetcomplete/StreetComplete/refs/heads/master/res/graphics/quest/sidewalk.svg',
		CyclewayOverlay:
			'https://raw.githubusercontent.com/streetcomplete/StreetComplete/refs/heads/master/res/graphics/quest/bicycleway.svg',
		StreetParkingOverlay:
			'https://raw.githubusercontent.com/streetcomplete/StreetComplete/refs/heads/master/res/graphics/quest/parking_lane.svg',
		AddressOverlay:
			'https://raw.githubusercontent.com/streetcomplete/StreetComplete/refs/heads/master/res/graphics/quest/housenumber.svg',
		PlacesOverlay:
			'https://raw.githubusercontent.com/streetcomplete/StreetComplete/refs/heads/master/res/graphics/quest/shop.svg',
		ThingsOverlay:
			'https://raw.githubusercontent.com/streetcomplete/StreetComplete/refs/heads/master/res/graphics/quest/dot.svg',
		BuildingsOverlay:
			'https://raw.githubusercontent.com/streetcomplete/StreetComplete/refs/heads/master/res/graphics/quest/building.svg'
	};

	// Check if the overlay is in the mapping
	if (overlay in overlayMapping) {
		return Promise.resolve(overlayMapping[overlay]);
	}

	// If not return null
	return Promise.resolve(null);
}
