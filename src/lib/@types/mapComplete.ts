export interface MapCompleteThemeFolder {
	name: string;
	path: string;
	sha: string;
	size: number;
	url: string;
	html_url: string;
	git_url: string;
	download_url?: null;
	type: string;
}

export interface MapCompleteTheme {
	id: string;
	name: { [lang: string]: string };
	icon: string;
}
