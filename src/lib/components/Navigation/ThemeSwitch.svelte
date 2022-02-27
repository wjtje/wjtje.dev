<script lang="ts">
	import { browser } from '$app/env';
	import { writableLocal } from '$lib/store-localstorage';

	// Store the value inside localStorage
	const store = writableLocal('theme');
	let darkMode = $store == 'dark';
	$: $store = darkMode ? 'dark' : 'light';

	// Update the gui
	$: {
		if (browser && document) {
			document.documentElement.classList.remove(darkMode ? 'light' : 'dark');
			document.documentElement.classList.add(darkMode ? 'dark' : 'light');
		}
	}
</script>

<input type="checkbox" bind:checked={darkMode} />
