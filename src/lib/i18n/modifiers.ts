import type { Modifier } from '@sveltekit-i18n/parser-default';

export const capitalize: Modifier.T = ({ value, defaultValue }) => {
	const s: string = value || defaultValue;
	return s.charAt(0).toLocaleUpperCase() + s.slice(1);
};

export const sanitize: Modifier.T = ({ value, defaultValue }) => {
	const s: string = value || defaultValue;
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
