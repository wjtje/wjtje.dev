<script lang="ts">
	export let fork: boolean;
	export let parentName: string;
	export let parentUrl: string;
</script>

{#if fork}
	<span>
		Forked from <a href={parentUrl}>{parentName}</a>
	</span>
{/if}

<style lang="scss">
	span {
		@apply text-gray-700 gdark:text-gray-300 text-xs mb-[-0.1rem] block;

		a {
			@apply text-blue-600 hover:text-blue-700 gdark:text-blue-300 hover:gdark:text-blue-500 transition-colors;
		}
	}
</style>
