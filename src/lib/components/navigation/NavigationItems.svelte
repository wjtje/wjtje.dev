<script lang="ts">
	import { fade } from 'svelte/transition';
	import MdMenu from 'svelte-icons/md/MdMenu.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let showMobileMenu = writable(false);
	setContext('showMobileMenu', showMobileMenu);

	const handleClick = () => {
		$showMobileMenu = !$showMobileMenu;
	};
</script>

<button on:click={handleClick} aria-label="Menu open"> <MdMenu /> </button>

{#if $showMobileMenu}
	<section transition:fade={{ duration: 150 }} class="mobile">
		<button on:click={handleClick} aria-label="Menu close"> <MdClose /> </button>
		<slot />
	</section>
{:else}
	<section>
		<slot />
	</section>
{/if}

<style lang="scss">
	button {
		@apply md:hidden h-full p-3;
		// This is a terrible fix for safari because it doesn't support justify-content: flex-start
		@apply w-[46px] [@supports(justify-content:flex-start)]:w-auto;
	}

	section {
		// On larger screen make it full width
		@apply md:flex-grow;
		// On small screen stack the items,
		// and on larger screens display the side-by-side
		@apply hidden md:flex gap-1 md:gap-4 flex-col md:flex-row md:items-center;
		// On small screen make it full screen,
		// and on larger screens make it inline
		@apply absolute top-0 left-0 w-full h-screen px-6 py-6 bg-zinc-700;
		@apply md:relative md:w-auto md:h-full md:px-0 md:py-0 md:bg-transparent;

		button {
			// Display the close button at the top left
			@apply absolute top-0 right-6 h-12;
		}

		& > :global(*) {
			// Give the childeren the correct style
			@apply px-0 md:px-2;
		}

		& > :global(.active) {
			@apply text-green-400 md:text-white font-semibold md:font-bold;
		}

		&.mobile {
			@apply flex;
		}
	}
</style>
