import { cacheDuration } from '$lib/common';
import { prisma } from '$lib/prisma';
import { DateTime } from 'luxon';

export interface RemoteData {
	mainTitle: string;
	subTitle?: string;
	date?: string;
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
