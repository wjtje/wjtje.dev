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
	import { Navigation, NavigationTitle, NavigationItems } from '$lib/components/Navigation';
	import LanguageSwitcher from '$lib/components/Navigation/LanguageSwitcher.svelte';
	import ThemeSwitcher from '$lib/components/Navigation/ThemeSwitcher.svelte';
	import { t } from '$lib/i18n';
	import '../app.css';
</script>

<Navigation>
	<NavigationTitle>{$t('common.title')}</NavigationTitle>
	<NavigationItems>
		<a href={`/${$locale}`}>Home</a>
		<a href={`/${$locale}/about`}>About</a>
		<div />
		<LanguageSwitcher />
		<ThemeSwitcher />
	</NavigationItems>
</Navigation>

<main>
	<slot />
</main>

<style lang="scss">
	:global(body) {
		@apply gdark:bg-gray-900 gdark:text-white min-h-screen;
	}

	main {
		@apply container mx-auto my-4 px-2;
	}

	div {
		@apply flex-grow;
	}
</style>
