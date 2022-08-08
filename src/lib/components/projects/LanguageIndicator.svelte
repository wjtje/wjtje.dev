<script lang="ts">
	import { onMount } from 'svelte';
	import colors from 'github-colors/colors.json';
	export let language: string;
	let indicator;

	const included = Object.keys(colors).find((key) => key === language);

	onMount(() => {
		if (included) {
			indicator.style.color = colors[included].color;
		}
	});
</script>

<span>
	{#if included}
		<span class="indicator" bind:this={indicator}>●</span>
	{/if}
	{language}
</span>

<style lang="scss">
	span {
		@apply text-xs text-gray-200 mb-[-0.1rem];
	}

	.indicator {
		@apply text-lg;
	}
</style>
