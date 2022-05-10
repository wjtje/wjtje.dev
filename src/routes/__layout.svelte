<script lang="ts" context="module">
	import { loadTranslations, locale } from '$lib/i18n';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => {
		const { pathname } = url;
		const lang = `${pathname.match(/\w+?(?=\/|$)/) || ''}`;
		const route = pathname.replace(new RegExp(`^/${lang}`), '');

		await loadTranslations(lang, route);
		locale.set(lang);

		return { stuff: { route, lang }, props: { url } };
	};
</script>

<script lang="ts">
	import {
		Navigation,
		NavigationTitle,
		NavigationItems,
		NavigationItem
	} from '$lib/components/Navigation';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { t } from '$lib/i18n';
	import '../app.css';
	import PageTransition from '$lib/components/PageTransition.svelte';

	$: routes = [
		{
			path: ``,
			name: $t('navigation.home')
		},
		{
			path: `contact`,
			name: $t('navigation.contact')
		}
	];

	export let url: URL;
</script>

<Navigation>
	<NavigationTitle><a href={`/${$locale}/`}>{$t('common.title')}</a></NavigationTitle>
	<NavigationItems>
		{#each routes as route}
			<NavigationItem {...route} />
		{/each}
		<div />
		<LanguageSwitcher />
		<ThemeSwitcher />
	</NavigationItems>
</Navigation>

<PageTransition {url}>
	<slot />
</PageTransition>

<style lang="scss">
	:global(body) {
		@apply gdark:bg-gray-900 gdark:text-white min-h-screen transition-colors overflow-hidden;
	}

	div {
		@apply flex-grow;
	}
</style>
