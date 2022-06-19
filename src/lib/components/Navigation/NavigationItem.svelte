<script lang="ts">
	import { locale } from '$lib/i18n';
	import { page } from '$app/stores';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';

	// Props
	export let name: string;
	export let path: string;

	let showMobileMenu: Writable<boolean> = getContext('showMobileMenu');

	$: url = `/${$locale}${path == '' ? '' : '/'}${path}`;

	function onClick() {
		$showMobileMenu = false;
	}
</script>

<a href={url} class:active={$page.url.pathname.split('/')[2] == path} on:click={onClick}>{name}</a>

<style lang="scss">
	a {
		@apply text-lg md:text-base transition-[font-weight];
	}
</style>
