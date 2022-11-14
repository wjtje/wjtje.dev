<script lang="ts">
	import {
		Navigation,
		NavigationTitle,
		NavigationItems,
		NavigationItem
	} from '$lib/components/navigation';
	import LanguageSwitcher from '$lib/components/common/LanguageSwitcher.svelte';
	import ThemeSwitcher from '$lib/components/common/ThemeSwitcher.svelte';
	import { locales, t, locale } from '$lib/i18n';
	import '../app.css';
	import PageTransition from '$lib/components/common/PageTransition.svelte';
	import Particles from '$lib/components/common/Particles.svelte';
	import type { LayoutData } from './$types';

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

	export let data: LayoutData;
	$: ({ url, lang, route } = data);
</script>

<svelte:head>
	{#each $locales as locale}
		<link rel="alternate" hreflang={locale} href={`/${locale}${route}`} />
	{/each}
</svelte:head>

<Particles />

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
		@apply md:flex-grow md:border-none border border-zinc-500 bg-zinc-500;
	}

	footer {
		@apply fixed bottom-0 h-8 w-full flex flex-row px-8 justify-end print:hidden;

		a {
			@apply text-sm text-zinc-600 hover:text-zinc-800 gdark:text-zinc-400 gdark:hover:text-zinc-200;
		}
	}
</style>
