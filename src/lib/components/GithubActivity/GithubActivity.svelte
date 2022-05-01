<script lang="ts">
	import ActivityItem from './ActivityItem.svelte';
	import { t } from '$lib/i18n';
	import type { GithubEvent } from '$lib/@types/github';

	export let githubEvent: GithubEvent<any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
	export let githubStatus: number;
</script>

{#if githubStatus == 200}
	{#each githubEvent as event}
		<ActivityItem {event} />
	{/each}
{:else}
	<h3>{$t('GitHubActivity.LoadFailed', { status: githubStatus })}</h3>
{/if}
