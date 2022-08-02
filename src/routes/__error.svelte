<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ error, status, url }) => {
		return {
			props: {
				status,
				pathname: url.pathname
			}
		};
	};
</script>

<script lang="ts">
	import E404 from '$lib/components/error/404.svelte';
	import E418 from '$lib/components/error/418.svelte';
	import E500 from '$lib/components/error/500.svelte';

	export let status: number;
	export let pathname: string;
</script>

{#if pathname.endsWith('/418')}
	<E418 />
{:else if status == 404}
	<E404 />
{:else if status == 500}
	<E500 />
{:else}
	<h1>Unknown error</h1>
{/if}
