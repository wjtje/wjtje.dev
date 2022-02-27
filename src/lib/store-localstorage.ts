import { browser } from '$app/env';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

/**
 * A function similar to `writable`, but it implements `localStorage` support.
 * It also requires a `string` key, for the `localStorage`.
 *
 * Usage:
 * ```ts
 * const nameStore = writableLocal("name", "John Doe")
 * $nameStore = "Jane Doe"
 * ```
 *
 * **Note:** Running `writableLocal` with the same key as earlier will
 * result in two stores with different reactivity, but writing to
 * the same `localStorage`. Use with caution!
 *
 * @param key A key for saving and retrieving from `localStorage`
 * @param defaultValue An optional default value
 * @returns The same as if `writable` was called
 */
function writableLocal<T>(key: string, defaultValue?: T): Writable<T> {
	const store = writable<T>(defaultValue);

	if (browser && localStorage) {
		store.set(JSON.parse(localStorage.getItem(key)));
	}

	store.subscribe((newValue: T) => {
		if (browser && localStorage) {
			try {
				if (newValue !== undefined) {
					localStorage.setItem(key, JSON.stringify(newValue));
				} else {
					localStorage.removeItem(key);
				}
			} catch (e) {
				console.warn(e);
			}
		}
	});
	return store;
}

export { writableLocal };
