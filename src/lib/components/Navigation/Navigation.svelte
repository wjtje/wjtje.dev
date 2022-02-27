<script lang="ts">
	import { t } from '$lib/i18n';
	import LanguageSwitch from './LanguageSwitch.svelte';
	import './Navigation.css';
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<nav>
	<h1>{$t('common.title')}</h1>

	<div class="flex-grow" />
	<LanguageSwitch />
	<ThemeSwitch />
</nav>
