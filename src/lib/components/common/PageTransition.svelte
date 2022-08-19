<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { fly } from 'svelte/transition';

	export let url: URL;

	/// This contains the current page is shown right now
	let currentPage = '';
	/// This indicated if a new page is loading
	let isLoading = false;

	$: {
		// This makes sure the page transition is only triggered when the page actually changes
		const parts = url.pathname.split('/');
		currentPage = parts.slice(2).join('/');
	}

	// Update the loading state
	beforeNavigate(() => {
		isLoading = true;
	});

	afterNavigate(() => {
		isLoading = false;
	});

	let duration = 250;
</script>

<div class="content">
	{#key currentPage}
		<main in:fly={{ x: -5, duration, delay: duration }} out:fly={{ x: 5, duration }}>
			<slot />
		</main>
	{/key}

	{#if isLoading}
		<div class="loader" />
	{/if}
</div>

<style lang="scss">
	div.loader {
		@apply absolute top-12 w-screen h-1 z-50 bg-green-500;
		animation: load-right 2s 1s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
		animation-iteration-count: infinite;
		left: -100vw;
		transform-origin: left;
	}

	main {
		@apply container mx-auto py-4 lg:py-8 px-4 lg:px-8;
	}

	@keyframes load-right {
		0% {
			left: -100vw;
		}
		50% {
			left: 0vw;
		}
		100% {
			left: 100vw;
		}
	}
</style>
