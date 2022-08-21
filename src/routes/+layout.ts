import { loadTranslations, locale } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	const { pathname } = url;
	const lang = `${pathname.match(/\w+?(?=\/|$)/) || ''}`;
	const route = pathname.replace(new RegExp(`^/${lang}`), '');

	await loadTranslations(lang, route);
	locale.set(lang);

	return {
		url,
		route,
		lang
	};
};
