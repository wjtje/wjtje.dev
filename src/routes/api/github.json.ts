import type { GithubEvent } from '$lib/@types/github';
import { checkCacheState, type RemoteData } from '$lib/api/helper';
import { GitHubUsername } from '$lib/common';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from './__types/github.json';

export const get: RequestHandler = async () => {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('github');

	if (!cacheState) {
		// Remove old cache
		await prisma.remoteData.deleteMany({
			where: {
				remoteSource: {
					name: 'github'
				}
			}
		});

		// Get new JSON data from GitHub
		const response = await fetch(
			`https://api.github.com/users/${GitHubUsername}/events/public?per_page=10`
		);
		const json: GithubEvent<any>[] = await response.json(); // eslint-disable-line @typescript-eslint/no-explicit-any

		// Save the data in the cache
		await Promise.all(
			json.map(async (event) => {
				// Create base object
				const data: RemoteData = {
					date: event.created_at,
					mainTitle: {
						id: 'GitHubActivity.UnknownEvent',
						data: {
							type: event.type
						}
					},
					subTitle: {
						id: 'GitHubActivity.UnknownEventSubtitle',
						data: {
							id: event.id
						}
					}
				};

				// Save object inside database
				await prisma.remoteData.create({
					data: {
						date: data.date,
						mainTitle: JSON.stringify(data.mainTitle),
						subTitle: JSON.stringify(data.subTitle) ?? null,
						image: data.image,
						remoteSourceId: id
					}
				});
			})
		);
	}

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
			}
		})
	};
};
