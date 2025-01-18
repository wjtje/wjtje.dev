import type { OwnedGamesAPIResponse, PlayerSummaryAPIResponse } from '$lib/@types/steam';
import type { CurrentActivity } from '@prisma/client';
import type ActivitySource from '.';
import { env } from '$env/dynamic/private';

export default class Steam implements ActivitySource {
	id = 'steam';
	name = 'Steam';

	private readonly apiKey = env.STEAM_TOKEN;
	private readonly userId = env.STEAM_USERID;

	async getActivities() {
		const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${this.userId}&format=json`;
		console.log(`[steam.ts] Fetching Steam user data from ${url}`);

		const response = await fetch(url);
		const data: PlayerSummaryAPIResponse = await response.json();

		if (!response.ok) {
			console.error(`[steam.ts] Failed to fetch Steam user data: ${response.statusText}`);
			return [];
		}
		const gameId = data.response.players[0].gameid;

		// See if we have an active game
		if (gameId) {
			const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${this.apiKey}&steamid=${this.userId}&include_appinfo=true&include_played_free_games=true&format=json`;

			const response = await fetch(url);
			const data: OwnedGamesAPIResponse = await response.json();

			if (!response.ok) {
				console.error(`[steam.ts] Failed to fetch Steam game data: ${response.statusText}`);
				return [];
			}

			// No idea why Steam ocasionaly uses a string and calls it gameid and uses a number and calls it appid
			const game = data.response.games.find((game) => game.appid === parseInt(gameId));

			if (game) {
				// @ts-expect-error - Prisma...
				const activity: CurrentActivity = {
					title: game.name,
					titleUrl: `https://store.steampowered.com/app/${game.appid}`,
					subtitle: JSON.stringify({
						id: 'activity.steam.subtitle',
						data: {
							totalTime: Math.floor(game.playtime_forever / 60)
						}
					}),
					image: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
					imageAlt: game.name,
					start: new Date(game.rtime_last_played * 1000)
				};

				return [activity];
			}
		}

		return [];
	}
}
