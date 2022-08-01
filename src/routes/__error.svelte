<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ error, status }) => {
		return {
			props: {
				status
			}
		};
	};
</script>

<script lang="ts">
	import E404 from '$lib/components/error/404.svelte';

	export let status: number;
</script>

{#if status == 404}
	<E404 />
{:else}
	<h1>Unknown error</h1>
{/if}
