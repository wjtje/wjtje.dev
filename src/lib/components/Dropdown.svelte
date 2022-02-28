<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let title: string;
	export let options: string[];
	export let action: (e: number) => void;
	export let active: number = -1;
	export let rightSafety = false;

	let hovering = false;

	function enter() {
		hovering = true;
	}

	function leave() {
		hovering = false;
	}
</script>

<div on:mouseenter={enter} on:mouseleave={leave}>
	<button>
		<span>{title}</span>

		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
			><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
		</svg></button
	>

	{#if hovering}
		<ul transition:fly={{ y: 100, duration: 150 }} class:right-0={rightSafety}>
			{#each options as option, index}
				<li
					on:click={() => {
						action(index);
					}}
					class:active={index == active}
				>
					<span>{option}</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	div {
		@apply inline-block relative h-6;

		// Give the button the correct size and positition
		button {
			@apply inline-flex items-center;

			span {
				@apply mr-1 text-base;
			}

			// Make the down arrow the correct color and size
			svg {
				@apply fill-current h-4 w-4;
			}
		}

		ul {
			// Set it the correct position
			@apply absolute min-w-[6rem] left-[-1rem];
			// Give it the correct color and style
			@apply rounded-md shadow-md bg-white dark:bg-gray-700;

			li {
				// Make it the correct size
				@apply h-8 px-4 my-2;
				// Center the text vertically
				@apply flex flex-col justify-center;

				@apply cursor-pointer;

				// Make the active item slightly bold
				&.active {
					@apply font-medium;
				}

				span {
					// Make the text the correct color and size
					@apply text-gray-900 dark:text-white text-base whitespace-nowrap;
				}
			}
		}
	}
</style>
