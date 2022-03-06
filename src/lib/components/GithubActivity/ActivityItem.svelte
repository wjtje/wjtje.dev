<script lang="ts">
	import { DateTime } from 'luxon';
	import { locale } from '$lib/i18n';
	import { t } from '$lib/i18n';
	import type { GithubEvent } from './github';

	export let event: GithubEvent<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

	$: date = DateTime.fromISO(event.created_at).toRelative({
		locale: $locale
	});
</script>

<div>
	<span>{date}</span>

	{#if event.type == 'CommitCommentEvent'}
		<h3>
			{@html $t(`github.${event.type}`, {
				...event.payload?.comment,
				repo: event.repo.name
			})}
		</h3>

		{#if event.payload?.comment?.body != null}
			<p>{event.payload?.comment?.body}</p>
		{/if}
	{:else if event.type == 'CreateEvent' || event.type == 'DeleteEvent'}
		<h3>
			{@html $t(`github.${event.type}`, {
				...event.payload,
				repo: event.repo.name
			})}
		</h3>
	{:else if event.type == 'ForkEvent'}
		<h3>
			{@html $t(`github.${event.type}`, {
				...event.payload?.forkee,
				repo: event.repo.name
			})}
		</h3>
	{:else if event.type == 'GollumEvent'}
		<h3>
			{@html $t(`github.${event.type}`, {
				...event.payload,
				repo: event.repo.name
			})}
		</h3>
		<p>{($t(`github.${event.type}Subtitle`), { pages: event.payload?.pages?.length ?? 0 })}</p>
	{:else if event.type == 'IssueCommentEvent'}
		<h3>
			{@html $t(`github.${event.type}.${event.payload?.action ?? 'unknown'}`, {
				issue: event.payload?.issue?.title,
				issue_html: event.payload?.issue?.html_url,
				repo: event.repo.name
			})}
		</h3>
		{#if event.payload?.action == 'created' || event.payload?.action == 'edited'}
			<p>{event.payload?.comment?.body}</p>
		{/if}
	{:else if event.type == 'IssuesEvent'}
		{#if event.payload?.action == 'opened' || event.payload?.action == 'edited' || event.payload?.action == 'closed'}
			<h3>
				{@html $t(`github.${event.type}.${event.payload?.action ?? 'unknown'}`, {
					issue: event.payload?.issue?.title,
					issue_html: event.payload?.issue?.html_url,
					repo: event.repo.name
				})}
			</h3>
			{#if event.payload?.action == 'opened'}
				<p>{event.payload?.issue?.body}</p>
			{/if}
		{/if}
	{:else if event.type == 'PublicEvent'}
		<h3>
			{$t(`github.${event.type}`, {
				repo: event.repo.name
			})}
		</h3>
	{:else if event.type == 'PullRequestEvent'}
		{#if event.payload?.action == 'opened' || event.payload?.action == 'edited' || event.payload?.action == 'closed' || event.payload?.action == 'reopened'}
			<h3>
				{@html $t(`github.${event.type}.${event.payload?.action ?? 'unknown'}`, {
					repo: event.repo.name
				})}
			</h3>
			<p>
				{@html $t(`github.${event.type}.subtitle`, {
					...event.payload?.pull_request
				})}
			</p>
		{/if}
	{:else if event.type == 'PullRequestReviewEvent'}
		<h3>
			{@html $t(`github.${event.type}`, {
				review_url: event.payload?.review?.html_url,
				pull_request_url: event.payload?.pull_request?.html_url,
				pull_request: event.payload?.pull_request?.title,
				repo: event.repo.name
			})}
		</h3>
	{:else if event.type == 'PullRequestReviewCommentEvent'}
		<h3>
			{@html $t(`github.${event.type}`, {
				comment_url: event.payload?.comment?.html_url,
				pull_request_url: event.payload?.pull_request?.html_url,
				pull_request: event.payload?.pull_request?.title,
				repo: event.repo.name
			})}
		</h3>
	{:else if event.type == 'PushEvent'}
		<h3>
			{@html $t(`github.${event.type}`, {
				size: event.payload?.size,
				repo: event.repo.name
			})}
		</h3>
		<p>
			{$t(`github.${event.type}Subtitle`, {
				commit: event.payload?.commits[0].message
			})}

			{#if event.payload?.commits.length > 1}
				{$t(`github.${event.type}SubtitleMore`, { count: event.payload?.commits.length - 1 })}
			{/if}
		</p>
	{:else if event.type == 'ReleaseEvent'}
		<h3>
			{@html $t(`github.${event.type}`, {
				repo: event.repo.name,
				html_url: event.payload?.release.html_url,
				name: event.payload?.release.name
			})}
		</h3>
		<p>{event.payload?.release.body}</p>
	{:else if event.type == 'WatchEvent'}
		<h3>
			{@html $t(`github.${event.type}`, {
				repo: event.repo.name
			})}
		</h3>
	{:else}
		<h3>{$t('github.UnknownEvent', { ...event })}</h3>
		<p>{$t('github.UnknownEventSubtitle', { ...event })}</p>
	{/if}
</div>

<style lang="scss">
	div {
		@apply pb-4;

		span {
			@apply text-xs text-gray-700 dark:text-gray-300 mb-[-0.1rem] block;
		}

		h3 {
			@apply text-xl whitespace-nowrap overflow-hidden text-ellipsis w-full block;
		}

		p {
			@apply text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full block;
		}

		:global(a) {
			@apply text-sky-700 gdark:text-blue-200 hover:text-blue-700 gdark:hover:text-sky-600 transition-colors;
		}
	}
</style>
