<script lang="ts">
	export let link: string;
	export let type: 'small' | 'large' = 'small';
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';
	const className = `button ${type}`;
</script>

<a class={className} href={link}>
	{#if type === 'large'}
		View on GitHub <GoMarkGithub />
	{:else}
		<GoMarkGithub />
	{/if}
</a>

<style lang="scss">
	.button {
		@apply border-2 border-white rounded-lg p-2 max-w-max;

		:global(svg) {
			@apply h-8 w-8 p-2 fill-current inline;
		}

		&.large:hover {
			@apply bg-white text-black transition-colors duration-300;
		}

		&.small {
			@apply border-none;
			:global(svg) {
				@apply h-6 w-6 p-1;
			}
		}
	}
</style>
