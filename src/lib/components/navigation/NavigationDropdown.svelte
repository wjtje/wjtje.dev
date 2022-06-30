<script lang="ts">
	import { browser } from '$app/env';
	import { getContext, onMount } from 'svelte';

	import { createMedia } from 'svelte-match-media';
	import type { mediaObject } from 'svelte-match-media';
	import { fly } from 'svelte/transition';
	import type { Writable } from 'svelte/store';

	// Props
	export let title: string;
	export let options: string[];
	export let action: (e: number) => void;
	export let active = -1;

	let showMobileMenu: Writable<boolean> = getContext('showMobileMenu');

	// Register media querys
	let media: mediaObject;

	onMount(() => {
		media = createMedia({
			md: 'screen and (min-width: 768px)'
		}).media;
	});

	// State
	let hovering = false;
	let dropdown: HTMLUListElement;

	// Functions
	function mouseEnter() {
		if ($media.md) {
			hovering = true;
		}
	}

	function mouseLeave() {
		hovering = false;
	}

	function buttonClick() {
		// Check if we need to run the animation
		if (dropdown == null) {
			return;
		}

		// clear the current animation
		dropdown.style.height = '';
		dropdown.style.transition = 'none';

		// Get the current height
		const startHeight = (browser && window).getComputedStyle(dropdown).height ?? '0';

		// Get the new height
		dropdown.classList.toggle('collapsed');
		const height = (browser && window).getComputedStyle(dropdown).height ?? '0';

		// Start the animation
		dropdown.style.height = startHeight;

		requestAnimationFrame(() => {
			dropdown.style.transition = '';

			requestAnimationFrame(() => {
				dropdown.style.height = height;
			});
		});
	}
</script>

<div on:mouseenter={mouseEnter} on:mouseleave={mouseLeave}>
	<button on:click={buttonClick}>
		<span>{title}</span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
		</svg>
	</button>

	{#if hovering && $media.md}
		<ul transition:fly={{ y: 50, duration: 50 }}>
			{#each options as option, index}
				<li on:click={() => action(index)} class:active={active == index}>
					<span>{option}</span>
				</li>
			{/each}
		</ul>
	{:else}
		<ul bind:this={dropdown} class="collapsed mobile">
			{#each options as option, index}
				<li
					on:click={() => {
						action(index);
						$showMobileMenu = false;
					}}
					class:active={active == index}
				>
					{option}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	div {
		@apply md:h-full inline-block relative;

		// Give the button the correct size and positition
		button {
			@apply md:h-full inline-flex items-center;

			span {
				@apply text-lg md:text-base mr-1;
			}

			:global(svg) {
				@apply fill-current h-4 w-4;
			}
		}

		ul {
			// Set it the correct position
			@apply h-auto md:h-auto overflow-hidden md:absolute md:min-w-[6rem] md:w-fit px-4 left-[-0.5rem] md:right-0 transition-[height] ease-in-out;
			// Give it the correct color and style
			@apply md:rounded-md md:shadow-md md:bg-white md:dark:bg-gray-700;

			&.mobile {
				@apply md:hidden;
			}

			&.collapsed {
				@apply h-0;
			}

			li {
				// Make it the correct size
				@apply h-8 my-2;
				// Center the text vertically
				@apply flex flex-col justify-center;

				@apply cursor-pointer;

				// Make the active item slightly bold
				&.active {
					@apply text-green-400 md:text-white font-semibold md:font-bold;
				}

				span {
					@apply text-gray-900 md:dark:text-white text-base whitespace-nowrap;
				}
			}
		}
	}
</style>
