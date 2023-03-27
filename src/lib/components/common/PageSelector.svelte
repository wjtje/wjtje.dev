<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();

	export let pageCount: number;
	export let currentPage: number;
</script>

<span class="selector">
	{#each Array(pageCount) as _, i}
		<button
			class="page-button"
			on:click={() => dispatcher('pageChange', { page: i + 1 })}
			class:active={i + 1 === currentPage}
		>
			{i + 1}
		</button>
	{/each}
</span>

<style lang="scss">
	.selector {
		@apply flex flex-row items-center justify-center w-full rounded-l;

		button {
			@apply bg-gray-200 text-gray-700 font-bold py-2 px-4 border-[1px];

			&.active {
				@apply bg-gray-700 text-white;
			}

			&:first-child {
				@apply rounded-l;
			}

			&:last-child {
				@apply rounded-r;
			}

			&:hover {
				@apply bg-gray-800 text-white;
			}
		}
	}
</style>
