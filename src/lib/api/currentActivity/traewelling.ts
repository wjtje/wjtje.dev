import type { StatusAPIResponse } from '$lib/@types/traewelling';
import type { CurrentActivity } from '@prisma/client';
import type ActivitySource from '.';
import { env } from '$env/dynamic/private';

export default class Traewelling implements ActivitySource {
	id = 'traewelling';
	name = 'Traewelling';

	private readonly username = env.TRAEWELLING_USERNAME;

	async getActivities() {
		const url = `https://traewelling.de/api/v1/user/${this.username}/statuses`;

		const response = await fetch(url);
		const data: StatusAPIResponse = await response.json();

		if (response.status !== 200) {
			console.error(
				`[traewelling.ts]: Error while fetching data from Traewelling: ${response.status}`
			);
			return [];
		}

		//@ts-expect-error - Prisma...
		const activities: CurrentActivity[] = data.data.map((status) => {
			const journeyText = status.train.journeyNumber ? ` (${status.train.journeyNumber})` : '';
			return {
				title: `${status.train.origin.name} → ${status.train.destination.name}`,
				titleUrl: `https://traewelling.de/status/${status.id}`,
				subtitle: JSON.stringify({
					id: 'activity.traewelling.subtitle',
					data: {
						line: `${status.train.lineName}${journeyText}`,
						distance: Math.floor(status.train.distance / 1000),
						points: status.train.points
					}
				}),
				image: `https://github.com/Traewelling/traewelling/blob/develop/public/images/icons/logo256.png?raw=true`,
				imageAlt: 'Traewelling Logo',
				start: status.train.origin.departure,
				end: status.train.destination.arrival
			};
		});

		return activities;
	}
}
