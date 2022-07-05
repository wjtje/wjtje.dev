import type { Modifier } from '@sveltekit-i18n/parser-default';
import { nameToEmoji } from 'gemoji';

export const capitalize: Modifier.T = ({ value, defaultValue }) => {
	const s = String(value || defaultValue);
	return s.charAt(0).toLocaleUpperCase() + s.slice(1);
};

export const sanitize: Modifier.T = ({ value, defaultValue }) => {
	const s = String(value || defaultValue);
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
};

export const replaceGithubEmote: Modifier.T = ({ value, defaultValue }) => {
	const reg = new RegExp(/:.*:/g);
	let s = String(value || defaultValue);
	let emote;

	while ((emote = reg.exec(s))) {
		const emoteClean = emote[0].substr(1, emote[0].length - 2);
		if (nameToEmoji[emoteClean]) {
			s = s.replace(emote[0], nameToEmoji[emoteClean]);
		}
	}

	return s;
};

export const gh: Modifier.T = (x) => {
	return replaceGithubEmote({ ...x, value: sanitize(x) });
};

export const min: Modifier.T = (x) => {
	return String(Number(x.value ?? x.defaultValue) - 1);
};

export const pushEventSubtitle: Modifier.T = (x) => {
	return gh({ ...x, value: String(x.value || x.defaultValue).split('\n')[0] });
};
