<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import MiniPostLoader from '$lib/components/common/MiniPostLoader.svelte';
	import type { RemoteData } from '@prisma/client';
	import MiniPost from '../common/MiniPost.svelte';

	export let activityName: string;

	// TODO: Auto language update
	onMount(async () => {
		const response = await fetch(`/api/${activityName}.json?lang=${locale.get()}`);
		const json = await response.json();

		events = json;
		status = response.status;
	});

	let events: RemoteData[] = [];
	let status: number;
</script>

{#if status == undefined}
	<MiniPostLoader />
{:else if status != 200}
	<h3>{$t('home.dataLoadingFailed', { status: status })}</h3>
{/if}

{#each events as event, i}
	<div in:scale={{ duration: 400, delay: i * 50 }}>
		<MiniPost
			title={event.mainTitle}
			subtitle={event.subTitle}
			date={event.date}
			image={event.image}
		/>
	</div>
{/each}
