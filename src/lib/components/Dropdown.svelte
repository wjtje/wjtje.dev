<script lang="ts">
	import { fade } from 'svelte/transition';

	export let title: string;
	export let options: string[];
	export let action: (e: number) => void;
	export let active: number;

	let hovering: boolean = false;

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

		<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
			><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
		</svg></button
	>

	{#if hovering}
		<ul transition:fade={{ duration: 150 }}>
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
		@apply inline-block relative;

		button {
			@apply py-2 px-4 inline-flex items-center;

			span {
				@apply mr-1 text-base;
			}

			svg {
				@apply fill-current h-4 w-4;
			}
		}

		ul {
			@apply absolute rounded-md shadow-md bg-white dark:bg-gray-700 min-w-[6rem];

			li {
				@apply transition-colors cursor-pointer h-8 flex flex-col justify-center px-4 my-2;

				&:nth-child(1) {
					@apply rounded-t-md;
				}

				&:nth-last-child(1) {
					@apply rounded-b-md;
				}

				&.active {
					@apply font-medium;
				}

				span {
					@apply text-gray-900 dark:text-white text-base whitespace-nowrap;
				}
			}
		}
	}
</style>
