<script lang="ts">
	import { page } from '$app/stores';

	import E404 from '$lib/components/error/404.svelte';
	import E418 from '$lib/components/error/418.svelte';
	import E500 from '$lib/components/error/500.svelte';
</script>

{#if $page.url.pathname.endsWith('/418')}
	<E418 />
{:else if $page.status == 404}
	<E404 />
{:else if $page.status == 500}
	<E500 />
{:else}
	<h1>Unknown error</h1>
{/if}
