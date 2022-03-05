<script lang="ts">
	import ActivityItem from './ActivityItem.svelte';
	import { t } from '$lib/i18n';
	import type { GithubEvent } from './github';

	export let githubEvent: GithubEvent[];
</script>

<section>
	<h1>{$t('github.title')}</h1>

	{#each githubEvent as event}
		<ActivityItem {event} />
	{/each}
</section>

<style lang="scss">
	section {
		@apply lg:max-w-[80%];

		h1 {
			@apply text-3xl pb-3;
		}
	}
</style>
