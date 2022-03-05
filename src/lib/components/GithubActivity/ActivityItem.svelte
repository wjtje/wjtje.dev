<script lang="ts">
	import { DateTime } from 'luxon';
	import { locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import {
		replaceGithubEmote,
		type GithubEvent,
		type GithubEventDeleteEventPayload
	} from './github';

	export let event: GithubEvent;

	$: date = DateTime.fromISO(event.created_at).toRelative({
		locale: $locale
	});
</script>

<div>
	<span>{date}</span>

	<h4>
		{@html $t(`github.${event.type}`, {
			repo_name: event.repo.name,
			delete_event_tag: event.payload?.ref,
			pull_request_event_action: $t(`github.action_${event.payload?.action ?? ''}`),
			pull_request_event_title: event.payload?.pull_request?.title,
			pull_request_event_url: event.payload?.pull_request?.html_url
		})}
	</h4>

	{#if event.type == 'PushEvent'}
		<span>{replaceGithubEmote(event.payload?.commits[0]?.message ?? 'No commit message')}</span>
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
