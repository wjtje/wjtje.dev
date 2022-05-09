<script lang="ts">
	import ActivityItem from './ActivityItem.svelte';
	import { t } from '$lib/i18n';
	import type { GithubEvent } from '$lib/@types/github';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import ActivityLoader from '../ActivityLoader.svelte';

	onMount(async () => {
		// Fetch the GitHub events
		const response = await fetch(`https://api.github.com/users/wjtje/events/public?per_page=10`);
		const json = await response.json();

		// Set the GitHub events
		githubEvent = json;
		githubStatus = response.status;
	});

	let githubEvent: GithubEvent<any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
	let githubStatus: number;
</script>

{#if githubStatus == undefined}
	<ActivityLoader />
{:else if githubStatus == 200}
	{#each githubEvent as event, i}
		<div transition:scale={{ duration: 400, delay: i * 50 }}>
			<ActivityItem {event} />
		</div>
	{/each}
{:else}
	<h3>{$t('GitHubActivity.LoadFailed', { status: githubStatus })}</h3>
{/if}
