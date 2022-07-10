<script lang="ts" context="module">
	import { loadTranslations, locale } from '$lib/i18n';
	import type { Load } from '@sveltejs/kit';
	import { page } from '$app/stores';

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
	} from '$lib/components/navigation';
	import LanguageSwitcher from '$lib/components/common/LanguageSwitcher.svelte';
	import ThemeSwitcher from '$lib/components/common/ThemeSwitcher.svelte';
	import { locales, t } from '$lib/i18n';
	import '../app.css';
	import PageTransition from '$lib/components/common/PageTransition.svelte';

	$: routes = [
		{
			path: ``,
			name: $t('navigation.home')
		},
		{
			path: `projects`,
			name: $t('navigation.projects')
		},
		{
			path: `blog`,
			name: $t('navigation.blog')
		},
		{
			path: `contact`,
			name: $t('navigation.contact')
		}
	];

	$: ({ route } = $page.stuff);

	export let url: URL;
</script>

<svelte:head>
	{#each $locales as locale}
		<link rel="alternate" hreflang={locale} href={`/${locale}${route}`} />
	{/each}
</svelte:head>

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

<footer>
	<a href={`/${$locale}/notice`}>notice</a>
</footer>

<style lang="scss">
	div {
		@apply flex-grow;
	}

	footer {
		@apply fixed bottom-0 h-8 w-full flex flex-row px-8 justify-end;

		a {
			@apply text-sm text-gray-600 hover:text-gray-800 gdark:text-gray-400 gdark:hover:text-gray-200;
		}
	}
</style>
