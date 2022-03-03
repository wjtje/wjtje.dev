import { locale } from '$lib/i18n';

export const capitalizeFirstLetter = ([first, ...rest]) =>
	first.toLocaleUpperCase(locale) + rest.join('');
