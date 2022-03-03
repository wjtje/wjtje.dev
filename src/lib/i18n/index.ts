import i18n from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'en';

interface key {
	key: string;
	routes?: string[];
}

const languages = ['en', 'nl', 'de'];
const keys: key[] = [
	// Different pages
	{
		key: 'home',
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

/** @type {import('@sveltejs/kit').Handle} */
const config = {
	translations: {
		en: { lang },
		nl: { lang },
		de: { lang }
	},
	loaders: languages.flatMap((language) => {
		return keys.map((key) => {
			return {
				locale: language,
				key: key.key,
				route: key.routes,
				loader: async () => (await import(`./${language}/${key.key}.json`)).default
			};
		});
	})
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
