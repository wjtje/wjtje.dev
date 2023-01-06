import { locales, defaultLocale, t, locale } from '$lib/i18n';
import { prisma } from '$lib/prisma';
import { DateTime } from 'luxon';
import { getMapCompleteName } from './getMapCompleteDetails';

export interface RemoteI18nData {
	id: string;
	data?: Record<string, unknown>;
}

export interface RemoteData {
	mainTitle: RemoteI18nData | string;
	subTitle?: RemoteI18nData | string;
	date?: string | Date;
	image?: string;
}

/**
 * This function checks if the cache is still valid.
 *
 * @returns {Promise<{ cacheState: boolean; id: number; }>} Returns true when the cache is still vallid, and false when it needs to be refreshed
 */
export async function checkCacheState(name: string): Promise<{ cacheState: boolean; id: number }> {
	let cacheState = await prisma.remoteSource.findFirst({
		where: {
			name: name
		}
	});

	// Check if cache exist
	if (cacheState == null) {
		console.warn(`[helper.ts]: Creating cache for ${name}`);

		cacheState = await prisma.remoteSource.create({
			data: {
				name: name
			}
		});
	}

	// Check if cache is valid
	return {
		cacheState: !(
			cacheState == null ||
			cacheState?.lastUpdate == null ||
			DateTime.fromJSDate(cacheState?.lastUpdate).diffNow('minutes').minutes <
				-Number(process.env['CACHE_DURATION'])
		),
		id: cacheState.id
	};
}

/**
 * Get all the cache for a remote source
 *
 * @param id The id of the remoteSource
 * @returns A object that can be returned to the client
 */
export async function getCacheData(id: number) {
	return await prisma.remoteData.findMany({
		where: {
			remoteSourceId: id
		},
		take: 10,
		select: {
			mainTitle: true,
			subTitle: true,
			date: true,
			image: true
		},
		orderBy: {
			date: 'desc'
		}
	});
}

/**
 * Save the data inside the cache
 *
 * @param data The data to save
 * @param id The id of the remoteSource
 */
export async function saveCacheData(data: RemoteData, id: number) {
	await prisma.remoteData.create({
		data: {
			date: data.date,
			mainTitle: JSON.stringify(data.mainTitle),
			subTitle: JSON.stringify(data.subTitle),
			image: data.image,
			remoteSourceId: id
		}
	});
}

/**
 * update the last fetch time of the data
 *
 * @param id The id of the remoteSource
 */
export async function updateCacheState(id: number) {
	await prisma.remoteSource.update({
		where: {
			id: id
		},
		data: {
			lastUpdate: DateTime.now().toISO()
		}
	});
}

/**
 * Get a language code from the URL object
 *
 * @param url {URL} The url object from the request
 * @returns {string} A language code that is valid
 */
export function extractLangFromUrl(url: URL) {
	const langFromUrl = url.searchParams.get('lang');
	const lang = locales.get().includes(langFromUrl) ? langFromUrl : defaultLocale;
	return lang;
}

export async function translateCache(id: number) {
	return await Promise.all(
		(
			await getCacheData(id)
		).map(async (item) => {
			const mainTitle = JSON.parse(item.mainTitle);
			const subTitle = JSON.parse(item.subTitle);

			if (mainTitle.data?.theme?.type == 'MapCompleteTheme') {
				mainTitle.data.theme = await getMapCompleteName(
					mainTitle.data.theme.data,
					locale.get() || defaultLocale
				);
			}

			return {
				...item,
				mainTitle:
					mainTitle == null
						? null
						: typeof mainTitle == 'string'
						? mainTitle
						: t.get(mainTitle.id, mainTitle.data ?? {}),
				subTitle:
					subTitle == null
						? null
						: typeof subTitle == 'string'
						? subTitle
						: t.get(subTitle.id, subTitle.data ?? {})
			};
		})
	);
}

/**
 * This generated a valid GitHub authorization header based on the values provided in the env file.
 *
 * @returns {string} A GitHub authorization header
 */
export function githubAuth() {
	return `Basic ${Buffer.from(
		`${process.env.GITHUB_USERNAME}:${process.env.GITHUB_TOKEN}`,
		'utf-8'
	).toString('base64')}`;
}
