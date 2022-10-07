<script lang="ts">
	export let link: string;
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';
</script>

<a class="button" href={link}>
	View on GitHub <GoMarkGithub />
</a>

<style lang="scss">
	.button {
		@apply border-2 border-white rounded-lg p-2 max-w-max;
		:global(svg) {
			@apply h-8 w-8 p-2 fill-current inline;
		}
	}
</style>
