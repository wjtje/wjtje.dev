import i18n from 'sveltekit-i18n';
import type { Config } from 'sveltekit-i18n';
import lang from './lang.json';

// Import modifiers from svelte-github-activity
import * as SvelteGitHubActivityModifiers from '$lib/i18n/modifiers';

export const defaultLocale = 'en';

interface key {
	key: string;
	routes?: string[];
	loaderUrl?: (locale: string) => () => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const languages = ['en', 'nl'];
const keys: key[] = [
	// Different pages
	{
		key: 'home',
		routes: ['/']
	},
	{
		key: 'GitHubActivity',
		routes: ['/']
	},
	{
		key: 'OsmActivity',
		routes: ['/']
	},
	{
		key: 'contact',
		routes: ['/contact']
	},
	// Common parts
	{
		key: 'navigation'
	},
	{
		key: 'common'
	}
];

type PayloadProps = {
	repo: string;
};

const config: Config<PayloadProps, Record<string, unknown>> = {
	parserOptions: {
		customModifiers: SvelteGitHubActivityModifiers
	},
	translations: {
		en: { lang },
		nl: { lang }
	},
	loaders: languages.flatMap((language) => {
		return keys.map((key) => {
			return {
				locale: language,
				key: key.key,
				route: key.routes,
				loader:
					key.loaderUrl == null
						? async () => (await import(`./${language}/${key.key}.json`)).default
						: key.loaderUrl(language)
			};
		});
	})
};

export const { t, locale, locales, loading, loadTranslations } = new i18n<
	[payload?: Record<string, unknown>]
>(config);
