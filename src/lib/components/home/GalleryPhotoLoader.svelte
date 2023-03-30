<script lang="ts">
	import { browser } from '$app/environment';
	import { writableLocal } from '$lib/store-localstorage';
	import { onMount } from 'svelte';
	import ContentLoader from 'svelte-content-loader';

	let active = false;

	let primaryColor = '#F4F4F5';
	let secondaryColor = '#E4E4E7';

	// Store the value inside localStorage
	const store = writableLocal('theme', 'system');

	onMount(() => {
		active = true;
	});

	$: {
		if (browser && document) {
			let theme = $store;

			if (
				(theme == 'system' &&
					window.matchMedia &&
					window.matchMedia('(prefers-color-scheme: dark)').matches) ||
				theme == 'dark'
			) {
				primaryColor = '#27272A';
				secondaryColor = '#3F3F46';
			}
		}
	}
</script>

{#if active}
	<ContentLoader {primaryColor} {secondaryColor} speed="1.5" width="252" height="212">
		<rect x="0" y="0" rx="4" ry="4" width="252" height="256" />
		<rect x="0" y="264" rx="4" ry="4" width="252" height="256" />
		<rect x="0" y="528" rx="4" ry="4" width="252" height="256" />
		<rect x="0" y="792" rx="4" ry="4" width="252" height="256" />
	</ContentLoader>
{/if}
