<script lang="ts">
	import { onMount } from 'svelte';
	import MiniPostLoader from '$lib/components/common/MiniPostLoader.svelte';
	import type { Changeset } from '$lib/@types/osm';
	import { scale } from 'svelte/transition';
	import { t } from '$lib/i18n';
	import ActivityItem from './ActivityItem.svelte';
	import { fetchOsmData } from './fetchOsmData';

	onMount(async () => {
		changesets = await fetchOsmData('Robin van der Linde');
	});

	let changesets: Changeset[] = null;
</script>

{#if changesets == null}
	<MiniPostLoader />
{:else if changesets.length != null}
	{#each changesets as changeset, i}
		<div in:scale={{ duration: 400, delay: i * 50 }}>
			<ActivityItem {changeset} />
		</div>
	{/each}
{:else}
	<h3>{$t('OsmActivity.LoadFailed')}</h3>
{/if}
