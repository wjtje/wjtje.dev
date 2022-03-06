import type { Modifier } from '@sveltekit-i18n/parser-default';

export const capitalize: Modifier.T = ({ value, defaultValue }) => {
	const s: string = value || defaultValue;
	return s.charAt(0).toLocaleUpperCase() + s.slice(1);
};
