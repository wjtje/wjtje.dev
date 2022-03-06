<script lang="ts">
	import ActivityItem from './ActivityItem.svelte';
	import { t } from '$lib/i18n';
	import type { GithubEvent } from './github';

	export let githubEvent: GithubEvent<any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
	export let githubStatus: number;
</script>

<section>
	<h1>{$t('github.title')}</h1>

	{#if githubStatus == 200}
		{#each githubEvent as event}
			<ActivityItem {event} />
		{/each}
	{:else}
		<h3>{$t('github.LoadFailed', { status: githubStatus })}</h3>
	{/if}
</section>

<style lang="scss">
	section {
		@apply lg:max-w-[80%];

		h1 {
			@apply text-3xl pb-3;
		}
	}
</style>
