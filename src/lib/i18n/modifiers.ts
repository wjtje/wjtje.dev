import type { Modifier } from '@sveltekit-i18n/parser-default';
import { nameToEmoji } from 'gemoji';

export const capitalize: Modifier.T = ({ value, defaultValue }) => {
	const s: string = value || defaultValue;
	return s.charAt(0).toLocaleUpperCase() + s.slice(1);
};

export const sanitize: Modifier.T = ({ value, defaultValue }) => {
	const s: string = value || defaultValue;
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};

export const replaceGithubEmote = ({ value, defaultValue }) => {
	const reg = new RegExp(/:.*:/g);
	let s: string = value || defaultValue;
	let emote;

	while ((emote = reg.exec(s))) {
		const emoteClean = emote[0].substr(1, emote[0].length - 2);
		if (nameToEmoji[emoteClean]) {
			s = s.replace(emote[0], nameToEmoji[emoteClean]);
		}
	}

	return s;
};
