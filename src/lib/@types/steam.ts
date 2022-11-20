export interface Game {
	/**
	 * Steam app ID of the game.
	 *
	 * @example 725110
	 */
	appid: number;

	/**
	 * Name of the game.
	 *
	 * @example "Overcrowd: A Commute 'Em Up"
	 */
	name: string;

	/**
	 * Amount of minutes the user has played the game in the last two weeks.
	 *
	 * @example 45
	 */
	playtime_2weeks: number;

	/**
	 * Amount of minutes the user has played the game in total.
	 *
	 * @example 198
	 */
	playtime_forever: number;

	/**
	 * Hash for the game's icon.
	 *
	 * Image URL can be constructed with `http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg`
	 *
	 * @example "53f87be05a8afe8f27aac5f070e76f69b4738867"
	 */
	img_icon_url: string;

	/**
	 * Hash for the game's logo.
	 *
	 * Image URL can be constructed with `http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg`
	 */
	img_logo_url?: string;

	/**
	 * Amount of minutes the user has played the game on a Windows machine.
	 *
	 * @example 1652
	 */
	playtime_windows_forever: number;

	/**
	 * Amount of minutes the user has played the game on a Mac machine.
	 *
	 * @example 0
	 */
	playtime_mac_forever: number;

	/**
	 * Amount of minutes the user has played the game on a Linux machine.
	 *
	 * @example 329
	 */
	playtime_linux_forever: number;
}

export interface RecentlyPlayedGames {
	/**
	 * Response object.
	 */
	response: {
		/**
		 * Total amount of games the user has played in the last two weeks.
		 */
		total_count: number;

		/**
		 * Array of games the user has played in the last two weeks.
		 */
		games: Game[];
	};
}
