<script lang="ts">
	import { DateTime } from 'luxon';
	import { locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import type { GithubEvent } from './github';

	export let event: GithubEvent<any>;

	$: date = DateTime.fromISO(event.created_at).toRelative({
		locale: $locale
	});
</script>

<div>
	<span>{date}</span>

	{#if event.type == 'CreateEvent'}
		<h4>{@html $t(`github.${event.type}`, { ...event.payload, repo: event.repo.name })}</h4>
	{:else}
		<h4>{@html $t(`github.${event.type}`)}</h4>
	{/if}
</div>

<style lang="scss">
	div {
		@apply pb-4;

		span:nth-child(1) {
			@apply text-xs text-gray-700 dark:text-gray-300 mb-[-0.1rem] block;
		}

		h4 {
			@apply text-lg;

			:global(a) {
				@apply hover:text-sky-600 transition-colors;
			}
		}

		span:nth-child(3) {
			@apply text-base whitespace-nowrap overflow-hidden text-ellipsis w-full block;
		}
	}
</style>
