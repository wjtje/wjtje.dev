export interface WatchingAPIResponse {
	expires_at: string;
	started_at: string;
	action: string;
	type: 'episode' | 'movie';
	episode?: {
		season: number;
		number: number;
		title: string;
		ids: {
			trakt: number;
			tvdb: unknown;
			imdb: unknown;
			tmdb: number;
			tvrage: unknown;
		};
	};
	show?: {
		title: string;
		year: number;
		ids: {
			trakt: number;
			slug: string;
			tvdb: number;
			imdb: string;
			tmdb: number;
			tvrage: number;
		};
	};
	movie?: {
		title: string;
		year: number;
		ids: {
			trakt: number;
			slug: string;
			imdb: string;
			tmdb: number;
		};
	};
}
