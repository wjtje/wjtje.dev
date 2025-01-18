import { env } from '$env/dynamic/private';
import type { WatchingAPIResponse } from '$lib/@types/trakt';
import type { CurrentActivity } from '@prisma/client';
import type ActivitySource from '.';

export default class Trakt implements ActivitySource {
	id = 'trakt';
	name = 'Trakt';

	private readonly clientId = env.TRAKT_CLIENT_ID;
	private readonly username = env.TRAKT_USERNAME;

	async getActivities() {
		const url = `https://api.trakt.tv/users/${this.username}/watching`;

		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'trakt-api-version': '2',
				'trakt-api-key': this.clientId
			}
		});

		if (response.status == 204) {
			return [];
		} else if (response.status !== 200) {
			console.error(`[trakt.ts]: Error while fetching data from Trakt: ${response.status}`);
			return [];
		}

		const data: WatchingAPIResponse = await response.json();

		let activityItem: CurrentActivity;

		// Now we need to figure out if it's a movie or a show
		switch (data.type) {
			case 'movie':
				// @ts-expect-error - Prisma...
				activityItem = {
					title: data.movie.title,
					titleUrl: `https://trakt.tv/movies/${data.movie.ids.slug}`,
					subtitle: JSON.stringify({
						id: 'activity.trakt.subtitle.movie',
						data: {
							year: data.movie.year
						}
					}),
					image: '/logo-trakt.svg',
					imageAlt: 'Trakt Logo',
					imageRounded: false,
					start: new Date(data.started_at),
					end: new Date(data.expires_at)
				};
				return [activityItem];
			case 'episode':
				// @ts-expect-error - Prisma...
				activityItem = {
					title: `${data.show.title} - ${data.episode.title}`,
					titleUrl: `https://trakt.tv/shows/${data.show.ids.slug}/seasons/${data.episode.season}/episodes/${data.episode.number}`,
					subtitle: JSON.stringify({
						id: 'activity.trakt.subtitle.episode',
						data: {
							season: data.episode.season,
							episode: data.episode.number,
							year: data.show.year
						}
					}),
					image: '/logo-trakt.svg',
					imageAlt: 'Trakt Logo',
					imageRounded: false,
					start: new Date(data.started_at),
					end: new Date(data.expires_at)
				};
				return [activityItem];
			default:
				return [];
		}
	}
}
