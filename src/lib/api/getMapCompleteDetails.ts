import { prisma } from '$lib/prisma';
import { checkCacheState, updateCacheState } from './helper';

interface Theme {
	id: string;
	name: string;
	icon: string;
}

/**
 * Get list of current official themes
 *
 * @returns {Theme[]}
 */
async function getThemes(): Promise<Theme[]> {
	const apiUrl = 'https://api.github.com/repos/pietervdvn/MapComplete/contents/assets/themes';
	const rawUrl = 'https://raw.githubusercontent.com/pietervdvn/MapComplete/master';
	const branch = 'master';

	console.log('[getMapCompleteDetails.ts]: Start download');

	const themeFolders = await (
		await fetch(apiUrl + '?ref=' + branch, {
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${process.env.GITHUB_USERNAME}:${process.env.GITHUB_TOKEN}`,
					'utf-8'
				).toString('base64')}`
			}
		})
	).json();

	console.log(`[getMapCompleteDetails.ts]: Got ${themeFolders.length} themes`);

	const themes: Theme[] = [];

	for (const themeFolder of themeFolders) {
		try {
			const theme = await (
				await fetch(
					rawUrl + '/assets/themes/' + themeFolder.name + '/' + themeFolder.name + '.json'
				)
			).json();
			let title = '';
			if (typeof theme.title === 'string') {
				title = theme.title;
			} else {
				title = theme.title.en ?? theme.title.nl ?? '';
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
	}

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
							name: theme.name,
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
 * Get an icon url from a theme name
 * @param theme The theme name
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
