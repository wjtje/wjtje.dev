import i18n from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'en';

const config = {
	translations: {
		en: { lang },
		nl: { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'profile',
			loader: async () => (await import('./en/profile.json')).default
		},
		{
			locale: 'en',
			key: 'head',
			loader: async () => (await import('./en/head.json')).default
		},

		{
			locale: 'nl',
			key: 'profile',
			loader: async () => (await import('./nl/profile.json')).default
		},
		{
			locale: 'nl',
			key: 'head',
			loader: async () => (await import('./nl/head.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
