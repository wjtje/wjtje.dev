<script lang="ts">
	import { t } from '$lib/i18n';
	import Dropdown from '../Dropdown.svelte';
	import './Navigation.css';
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<nav>
	<h1>{$t('common.title')}</h1>

	<div class="flex-grow" />
	<ThemeSwitch />
</nav>
