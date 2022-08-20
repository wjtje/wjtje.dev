<script lang="ts">
	import colors from 'github-colors/colors.json';
	export let language: string;

	const color = colors[language]?.color ?? '#eeeeee';
</script>

{#if language != null}
	<div>
		<span style={`--color: ${color};`}>●</span>
		{language}
	</div>
{/if}

<style lang="scss">
	div {
		@apply text-gray-700 gdark:text-gray-300 text-xs mb-[-0.1rem] block;

		span {
			color: var(--color);
		}
	}
</style>
