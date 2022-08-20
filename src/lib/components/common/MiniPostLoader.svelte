<script lang="ts">
	import { browser } from '$app/env';
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
		<rect width="64" height="12" rx="2" />
		<rect y="16" width="252" height="20" rx="2" />
		<rect y="40" width="166" height="16" rx="2" />
		<rect y="78" width="64" height="12" rx="2" />
		<rect y="94" width="252" height="20" rx="2" />
		<rect y="118" width="166" height="16" rx="2" />
		<rect y="156" width="64" height="12" rx="2" />
		<rect y="172" width="252" height="20" rx="2" />
		<rect y="196" width="166" height="16" rx="2" />
	</ContentLoader>
{/if}
