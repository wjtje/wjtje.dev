<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	import { fly } from 'svelte/transition';

	let url = '';
	let duration = 250;

	beforeNavigate(({ to }) => {
		url = to.pathname;
	});

	$: console.log(url);
</script>

{#key url}
	<main in:fly={{ x: -5, duration, delay: duration }} out:fly={{ x: 5, duration }}>
		<slot />
	</main>
{/key}

<style lang="scss">
	main {
		@apply container mx-auto my-4 lg:py-6 px-4 lg:px-8;
	}
</style>
