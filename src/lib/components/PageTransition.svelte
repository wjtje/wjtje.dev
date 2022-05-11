<script lang="ts">
	import { fly } from 'svelte/transition';

	export let url: URL;
	let cleanUrl: string = '';

	$: {
		// This makes sure the page transition is only triggered when the page actually changes
		const parts = url.pathname.split('/');
		cleanUrl = parts.slice(2).join('/');
	}

	let duration = 250;
</script>

<div>
	{#key cleanUrl}
		<main in:fly={{ x: -5, duration, delay: duration }} out:fly={{ x: 5, duration }}>
			<slot />
		</main>
	{/key}
</div>

<style lang="scss">
	div {
		@apply overflow-y-scroll overflow-x-hidden h-[calc(100vh-3rem)];
	}

	main {
		@apply container mx-auto py-4 lg:py-10 px-4 lg:px-8;
	}
</style>
