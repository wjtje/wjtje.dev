<script lang="ts">
	import { locale } from '$lib/i18n';

	export let pageCount: number;
	export let currentPage: number;
</script>

{#if pageCount > 1}
	<span class="selector">
		{#each Array(pageCount) as _, i}
			<a
				class="page-button"
				class:active={i + 1 === currentPage}
				href={`/${$locale}/blog/${i + 1}`}
			>
				{i + 1}
			</a>
		{/each}
	</span>
{/if}

<style lang="scss">
	.selector {
		@apply flex flex-row items-center justify-center w-full rounded-l;

		a {
			@apply bg-gray-200 text-zinc-900 font-bold py-2 px-4 border-[1px] transition-colors;
			@apply gdark:bg-zinc-900 gdark:text-white;

			&.active {
				@apply bg-gray-800 text-white;
				@apply gdark:text-zinc-900 gdark:bg-zinc-300;
			}

			&:first-child {
				@apply rounded-l;
			}

			&:last-child {
				@apply rounded-r;
			}

			&:hover {
				@apply gdark:bg-zinc-800 bg-zinc-400 text-white;
			}
		}
	}
</style>
