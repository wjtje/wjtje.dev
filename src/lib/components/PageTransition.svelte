<script lang="ts">
	import { beforeNavigate } from '$app/navigation';

	import { fly } from 'svelte/transition';

	let url = '';
	let duration = 250;

	beforeNavigate(({ to }) => {
		url = to.pathname;
	});

	$: console.log(url);
</script>

<div>
	{#key url}
		<main in:fly={{ x: -5, duration, delay: duration }} out:fly={{ x: 5, duration }}>
			<slot />
		</main>
	{/key}
</div>

<style lang="scss">
	div {
		@apply overflow-y-scroll h-[calc(100vh-3rem)];
	}

	main {
		@apply container mx-auto py-4 lg:py-10 px-4 lg:px-8;
	}
</style>
