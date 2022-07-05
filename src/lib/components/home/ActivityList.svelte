<script lang="ts">
	import ActivityItem from './ActivityItem.svelte';
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import MiniPostLoader from '$lib/components/common/MiniPostLoader.svelte';
	import type { RemoteData } from '@prisma/client';

	export let activityName: string;

	onMount(async () => {
		const response = await fetch(`/api/${activityName}.json`);
		const json = await response.json();

		events = json;
		status = response.status;
	});

	let events: RemoteData[];
	let status: number;
</script>

{#if status == undefined}
	<MiniPostLoader />
{:else if status == 200}
	{#each events as event, i}
		<div in:scale={{ duration: 400, delay: i * 50 }}>
			<ActivityItem
				event={{
					date: event.date,
					mainTitle: JSON.parse(event.mainTitle),
					subTitle: JSON.parse(event.subTitle)
				}}
			/>
		</div>
	{/each}
{:else}
	<h3>{$t('GitHubActivity.LoadFailed', { status: status })}</h3>
{/if}
