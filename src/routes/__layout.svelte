<script context="module">
	import Navigation from '$lib/components/Navigation.svelte';
	import { loadTranslations } from '$lib/i18n';
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ url }) => {
		const { pathname } = url;
		const lang = `${pathname.match(/\w+?(?=\/|$)/) || ''}`;
		const route = pathname.replace(new RegExp(`^/${lang}`), '');
		await loadTranslations(lang, route);
		return {};
	};
</script>

<Navigation />

<main>
	<slot />
</main>

<style global>
	/* Import tailwind */
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	main {
		@apply container mx-auto;
	}
</style>
