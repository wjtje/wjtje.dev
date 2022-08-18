import type { MapCompleteThemeFolder, MapCompleteTheme } from '$lib/@types/mapComplete';
import { prisma } from '$lib/prisma';
import { checkCacheState, updateCacheState } from './helper';
import { githubAuth } from './helper';

/**
 * Get list of current official themes
 *
 * @returns {MapCompleteTheme[]}
 */
async function getThemes(): Promise<MapCompleteTheme[]> {
	const branch = 'master';
	const apiUrl = 'https://api.github.com/repos/pietervdvn/MapComplete/contents/assets/themes';
	const rawUrl = 'https://raw.githubusercontent.com/pietervdvn/MapComplete/' + branch;

	console.log('[getMapCompleteDetails.ts]: Start download');

	const themeFolders: MapCompleteThemeFolder[] = await (
		await fetch(apiUrl + '?ref=' + branch, {
			headers: {
				Authorization: githubAuth()
			}
		})
	).json();

	// Check if response is array
	if (typeof themeFolders != 'object' || themeFolders.length == undefined) {
		console.warn("[getMapCompleteDetails.ts]: Response isn't an array");
		return;
	}

	console.log(`[getMapCompleteDetails.ts]: Got ${themeFolders.length} themes`);

	const themes: MapCompleteTheme[] = [];

	// Fetch data for all themes
	await Promise.all(
		themeFolders.map(async (themeFolder) => {
			try {
				const theme = await (
					await fetch(
						rawUrl + '/assets/themes/' + themeFolder.name + '/' + themeFolder.name + '.json'
					)
				).json();

				let title: Record<string, string>;

				if (typeof theme.title === 'string') {
					title = { en: theme.title };
				} else {
					title = theme.title;
				}

				themes.push({
					id: theme.id,
					name: title,
					icon: rawUrl + theme.icon.replace('.', '')
				});

				console.log(`[getMapCompleteDetails.ts]: Got theme: ${theme.id}`);
			} catch (e) {
				console.log(`[getMapCompleteDetails.ts]: Failed to get theme: ${themeFolder.name}`);
				console.log(e);
			}
		})
	);

	return themes;
}

/**
 * Update the cache containing all MapComplete themes
 */
export async function updateMapCompleteCache() {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('mapcomplete');

	if (!cacheState) {
		console.log('[getMapCompleteDetails.ts]: Updating cache');

		try {
			const themes = await getThemes();

			// Remove old cache
			await prisma.mapCompleteTheme.deleteMany();

			// Save new data in the cache
			await Promise.all(
				themes.map(async (theme) => {
					await prisma.mapCompleteTheme.create({
						data: {
							theme: theme.id,
							name: JSON.stringify(theme.name),
							iconUrl: theme.icon
						}
					});
				})
			);

			// Update the cache state
			await updateCacheState(id);
		} catch (e) {
			console.warn('[getMapCompleteDetails.ts]: Failed to update cache');
			console.log(e);
		}
	}
}

/**
 * Get an icon url from a theme ID
 * @param theme The theme ID
 * @returns {Promise<string|null>} An icon url
 */
export async function getMapCompleteImage(theme: string): Promise<string | null> {
	return (
		await prisma.mapCompleteTheme.findFirst({
			where: {
				theme
			}
		})
	)?.iconUrl;
}

/**
 * Get a localized name from a theme ID
 * @param theme The theme ID
 * @param lang The language
 * @returns {Promise<string|null>} A localized name
 */
export async function getMapCompleteName(theme: string, lang: string): Promise<string> {
	console.log(`[getMapCompleteDetails.ts]: Getting name for theme ${theme}`);

	const themeData = await prisma.mapCompleteTheme.findFirst({
		where: {
			theme
		}
	});

	if (!themeData) {
		return 'unknown';
	}

	const name = JSON.parse(themeData.name);

	if (!name[lang]) {
		// Fallback to English
		return name.en;
	}

	return name[lang];
}
