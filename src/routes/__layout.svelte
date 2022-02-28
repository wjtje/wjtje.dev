<script context="module">
	import { loadTranslations, locale } from '$lib/i18n';

	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ url }) => {
		const { pathname } = url;
		const lang = `${pathname.match(/\w+?(?=\/|$)/) || ''}`;
		const route = pathname.replace(new RegExp(`^/${lang}`), '');
		await loadTranslations(lang, route);
		locale.set(lang);
		return { stuff: { route, lang } };
	};
</script>

<script lang="ts">
	import Navigation from '$lib/components/Navigation/Navigation.svelte';
	import '../app.css';
</script>

<Navigation />

<main>
	<slot />
</main>

<style lang="scss">
	:global(body) {
		@apply gdark:bg-gray-900 gdark:text-white min-h-screen;
	}

	main {
		@apply container mx-auto my-4;
	}
</style>
