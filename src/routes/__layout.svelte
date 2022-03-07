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

<main>
	<slot />
</main>

<style lang="scss">
	:global(body) {
		@apply gdark:bg-gray-900 gdark:text-white min-h-screen transition-colors;
	}

	main {
		@apply container mx-auto my-4 lg:py-6 px-4 lg:px-8;
	}

	div {
		@apply flex-grow;
	}
</style>
