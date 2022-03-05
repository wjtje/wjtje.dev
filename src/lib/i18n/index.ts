import i18n, { type Config } from 'sveltekit-i18n';
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
		key: 'github',
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
}

const config: Config<PayloadProps, {}> = {
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

export const { t, locale, locales, loading, loadTranslations } = new i18n<[payload?: any]>(config);
