<script type="ts">
	export let count: number;
</script>

{#if count > 0}
	<div>
		<slot />
		{count}
	</div>
{/if}

<style lang="scss">
	div {
		@apply text-gray-700 gdark:text-gray-300 text-xs mb-[-0.1rem] flex gap-1;

		:global(svg) {
			@apply h-4 w-auto;
		}
	}
</style>
