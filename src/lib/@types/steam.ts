export interface PlayerSummaryAPIResponse {
	response: {
		players: PlayerSummary[];
	};
}

interface PlayerSummary {
	/**
	 * 64-bit SteamID of the user
	 */
	steamid: string;

	communityvisibilitystate: number;

	profilestate: number;

	profileurl: string;

	avatar: string;

	avatarmedium: string;

	avatarfull: string;

	avatarhash: string;

	lastlogoff: number;

	/**
	 * User's display name
	 */
	realname: string;

	primaryclanid: string;

	timecreated: number;

	personastateflags: number;

	/**
	 * If in-game, the user's current game (if available)
	 */
	gameextrainfo?: string;

	/**
	 * If in-game, the user's current game's appid (if available)
	 */
	gameid?: string;

	/**
	 * User's country code (ISO 3166-1 alpha-2)
	 * Private information
	 */
	loccountrycode: string;

	/**
	 * User's state code, uses steam_location
	 * Private information
	 */
	locstatecode: string;

	/**
	 * User's city id, uses steam_location
	 * Private information
	 */
	loccityid: number;
}

export interface OwnedGamesAPIResponse {
	response: {
		game_count: number;
		games: OwnedGame[];
	};
}

export interface OwnedGame {
	/**
	 * The game's appid
	 */
	appid: number;

	/**
	 * The game's name
	 */
	name: string;

	/**
	 * Total playtime of the game (in minutes)
	 */
	playtime_forever: number;

	/**
	 * Hash for the icon URL
	 * https://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg
	 */
	img_icon_url: string;

	has_community_visible_stats: boolean;

	/**
	 * Total playtime of the game (in minutes) on Windows
	 */
	playtime_windows_forever: number;

	/**
	 * Total playtime of the game (in minutes) on Mac
	 */
	playtime_mac_forever: number;

	/**
	 * Total playtime of the game (in minutes) on Linux,
	 * note that this obviously includes Steam Deck playtime
	 */
	playtime_linux_forever: number;

	/**
	 * Total playtime of the game (in minutes) on Steam Deck
	 * This is part of the playtime_linux_forever value
	 */
	playtime_deck_forever: number;

	/**
	 * Unix timestamp of the last time the user played the game (in seconds)
	 * Refers to the start of the last session, so can be used to calculate the duration so far
	 */
	rtime_last_played: number;

	/**
	 * Total playtime of the game (in minutes) while playing offline
	 */
	playtime_disconnected: number;
}
