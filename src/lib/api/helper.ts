import { cacheDuration } from '$lib/common';
import { prisma } from '$lib/prisma';
import { DateTime } from 'luxon';

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
			DateTime.fromJSDate(cacheState?.lastUpdate).diffNow('minutes').minutes < -cacheDuration
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
	return {
		body: await prisma.remoteData.findMany({
			where: {
				remoteSourceId: id
			},
			take: 10,
			select: {
				mainTitle: true,
				subTitle: true,
				date: true
			},
			orderBy: {
				date: 'desc'
			}
		})
	};
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
