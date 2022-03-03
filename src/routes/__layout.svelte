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
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { t } from '$lib/i18n';
	import { page } from '$app/stores';
	import '../app.css';

	$: routes = [
		{
			path: `/${$locale}`,
			name: $t('navigation.home')
		},
		{
			path: `/${$locale}/about`,
			name: $t('navigation.about')
		}
	];
</script>

<Navigation>
	<NavigationTitle>{$t('common.title')}</NavigationTitle>
	<NavigationItems>
		{#each routes as route}
			<a href={route.path} class:active={$page.url.pathname == route.path}>{route.name}</a>
		{/each}
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
		@apply container mx-auto my-4 lg:py-6 px-4 lg:px-8;
	}

	div {
		@apply flex-grow;
	}
</style>
