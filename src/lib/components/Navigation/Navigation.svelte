<script lang="ts">
	import { t } from '$lib/i18n';
	import LanguageSwitch from './LanguageSwitch.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<nav>
	<h1>{$t('common.title')}</h1>

	<div class="flex-grow" />
	<section>
		<LanguageSwitch />
		<ThemeSwitch />
	</section>
</nav>

<style lang="scss">
	nav {
		@apply flex sticky top-0 left-0 w-full h-12 items-center px-6 z-10 gap-4 bg-green-600 border-b-2 border-green-500 text-white;
		@apply gdark:bg-green-700 gdark:border-green-600;

		h1 {
			@apply text-xl;
		}

		section {
			@apply flex gap-4;
		}
	}
</style>
