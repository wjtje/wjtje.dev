<script lang="ts">
	import { fade } from 'svelte/transition';

	let showMobileMenu = false;

	const handleClick = () => {
		showMobileMenu = !showMobileMenu;
	};
</script>

<button on:click={handleClick}> = </button>

{#if showMobileMenu}
	<section transition:fade={{ duration: 150 }} class="mobile">
		<button on:click={handleClick}> x </button>
		<slot />
	</section>
{:else}
	<section>
		<slot />
	</section>
{/if}

<style lang="scss">
	button {
		@apply md:hidden;
	}

	section {
		// On larger screen make it full width
		@apply md:flex-grow;
		// On small screen stack the items,
		// and on larger screens display the side-by-side
		@apply hidden md:flex gap-1 md:gap-4 flex-col md:flex-row;
		// On small screen make it full screen,
		// and on larger screens make it inline
		@apply absolute top-0 left-0 w-full h-screen bg-gray-700;
		@apply md:relative md:w-auto md:h-auto md:bg-transparent;

		button {
			// Display the close button at the top left
			@apply absolute top-0 right-0;
		}

		& > :global(*) {
			@apply px-2;
		}

		&.mobile {
			@apply flex;
		}
	}
</style>
