import { activitySources, translateActivities } from '$lib/api/currentActivity';
import { checkCacheState, extractLangFromUrl, updateCacheState } from '$lib/api/helper';
import { prisma } from '$lib/prisma';
import type { CurrentActivity } from '@prisma/client';
import type { RequestHandler } from './$types';
import { loadTranslations } from '$lib/i18n';

export const GET: RequestHandler = async ({ url }) => {
	// Load the required translations
	await loadTranslations(extractLangFromUrl(url), '/api/activity');

	// Get information about the cache
	const { id, cacheState } = await checkCacheState('activity');

	if (!cacheState) {
		console.log('[activity.json.ts]: Updating cache');

		try {
			let activities: CurrentActivity[] = [];

			// Save the data in the cache
			for (const activitySource of activitySources) {
				console.log(`[activity.json.ts]: Fetching data from ${activitySource.name}`);
				const activitiesL = await activitySource.getActivities();
				activities.push(...activitiesL);
			}

			// Remove old cache
			await prisma.currentActivity.deleteMany();

			// Save the data in the cache
			await prisma.currentActivity.createMany({ data: activities });

			await updateCacheState(id);
		} catch (error) {
			console.error('[activity.json.ts]: Error while updating cache', error);

			const data = await prisma.currentActivity.findMany({
				where: {
					OR: [
						{
							end: {
								gte: new Date()
							}
						},
						{
							end: null
						}
					]
				},
				orderBy: {
					start: 'asc'
				}
			});

			return new Response(JSON.stringify(translateActivities(data)), {
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}

	// Get items from the DB
	const data = await prisma.currentActivity.findMany({
		where: {
			OR: [
				{
					end: {
						gte: new Date()
					}
				},
				{
					end: null
				}
			]
		},
		orderBy: {
			start: 'asc'
		}
	});

	return new Response(JSON.stringify(translateActivities(data)), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
