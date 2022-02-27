import i18n from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'en';

/** @type {import('@sveltejs/kit').Handle} */
const config = {
	translations: {
		en: { lang },
		nl: { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'profile',
			route: ['/'],
			loader: async () => (await import('./en/profile.json')).default
		},
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default
		},

		{
			locale: 'nl',
			key: 'profile',
			route: ['/'],
			loader: async () => (await import('./nl/profile.json')).default
		},
		{
			locale: 'nl',
			key: 'common',
			loader: async () => (await import('./nl/common.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
