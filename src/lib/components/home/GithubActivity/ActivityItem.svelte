<script lang="ts">
	import { t } from '$lib/i18n';
	import type { GithubEvent } from '$lib/@types/github';
	import MiniPost from '$lib/components/common/MiniPost.svelte';

	export let event: GithubEvent<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
</script>

<div>
	{#if event.type == 'CommitCommentEvent'}
		<MiniPost
			date={event.created_at}
			title={$t(`GitHubActivity.${event.type}`, {
				...event.payload?.comment,
				repo: event.repo.name
			})}
			subtitle={event.payload?.comment?.body ?? undefined}
		/>
	{:else if event.type == 'CreateEvent' || event.type == 'DeleteEvent'}
		<MiniPost
			date={event.created_at}
			title={$t(`GitHubActivity.${event.type}.${event.payload?.ref_type ?? 'unknown'}`, {
				...event.payload,
				repo: event.repo.name,
				id: event.id
			})}
		/>
	{:else if event.type == 'ForkEvent'}
		<MiniPost
			date={event.created_at}
			title={$t(`GitHubActivity.${event.type}`, {
				...event.payload?.forkee,
				repo: event.repo.name
			})}
		/>
	{:else if event.type == 'GollumEvent'}
		<MiniPost
			date={event.created_at}
			title={$t(`GitHubActivity.${event.type}`, {
				...event.payload,
				repo: event.repo.name
			})}
			subtitle={$t(`GitHubActivity.${event.type}Subtitle`, {
				pages: event.payload?.pages?.length ?? 0
			})}
		/>
	{:else if event.type == 'IssueCommentEvent'}
		<MiniPost
			date={event.created_at}
			title={$t(`GitHubActivity.${event.type}.${event.payload?.action ?? 'unknown'}`, {
				issue: event.payload?.issue?.title,
				issue_html: event.payload?.issue?.html_url,
				repo: event.repo.name,
				id: event.id
			})}
			subtitle={event.payload?.action == 'created' || event.payload?.action == 'edited'
				? event.payload?.comment?.body
				: undefined}
		/>
	{:else if event.type == 'IssuesEvent'}
		{#if event.payload?.action == 'opened' || event.payload?.action == 'edited' || event.payload?.action == 'closed'}
			<MiniPost
				date={event.created_at}
				title={$t(`GitHubActivity.${event.type}.${event.payload?.action ?? 'unknown'}`, {
					issue: event.payload?.issue?.title,
					issue_html: event.payload?.issue?.html_url,
					repo: event.repo.name,
					id: event.id
				})}
				subtitle={event.payload?.action == 'opened' && event.payload?.issue?.body != null
					? event.payload?.issue?.body
					: undefined}
			/>
		{/if}
	{:else if event.type == 'PublicEvent'}
		<MiniPost
			date={event.created_at}
			title={$t(`GitHubActivity.${event.type}`, {
				repo: event.repo.name
			})}
		/>
	{:else if event.type == 'PullRequestEvent'}
		{#if event.payload?.action == 'opened' || event.payload?.action == 'edited' || event.payload?.action == 'closed' || event.payload?.action == 'reopened'}
			<MiniPost
				date={event.created_at}
				title={$t(`GitHubActivity.${event.type}.${event.payload?.action ?? 'unknown'}`, {
					repo: event.repo.name,
					id: event.id
				})}
				subtitle={$t(`GitHubActivity.${event.type}.subtitle`, {
					...event.payload?.pull_request
				})}
			/>
		{/if}
	{:else if event.type == 'PullRequestReviewEvent'}
		<MiniPost
			date={event.created_at}
			title={$t(`GitHubActivity.${event.type}`, {
				review_url: event.payload?.review?.html_url,
				pull_request_url: event.payload?.pull_request?.html_url,
				pull_request: event.payload?.pull_request?.title,
				repo: event.repo.name
			})}
		/>
	{:else if event.type == 'PullRequestReviewCommentEvent'}
		<MiniPost
			date={event.created_at}
			title={$t(`GitHubActivity.${event.type}`, {
				comment_url: event.payload?.comment?.html_url,
				pull_request_url: event.payload?.pull_request?.html_url,
				pull_request: event.payload?.pull_request?.title,
				repo: event.repo.name
			})}
		/>
	{:else if event.type == 'PushEvent'}
		<MiniPost
			date={event.created_at}
			title={$t(`GitHubActivity.${event.type}`, {
				size: event.payload?.size,
				repo: event.repo.name
			})}
			subtitle={$t(`GitHubActivity.${event.type}Subtitle`, {
				commit: event.payload?.commits[0]?.message ?? $t('GitHubActivity.PushEventSubtitleEmpty')
			}) +
				(event.payload?.commits.length > 1
					? ' ' +
					  $t(`GitHubActivity.${event.type}SubtitleMore`, {
							count: event.payload?.commits.length - 1
					  })
					: '')}
		/>
	{:else if event.type == 'ReleaseEvent'}
		<MiniPost
			date={event.created_at}
			title={$t(`GitHubActivity.${event.type}`, {
				repo: event.repo.name,
				html_url: event.payload?.release.html_url,
				name: event.payload?.release.name
			})}
			subtitle={event.payload?.release.body}
		/>
	{:else if event.type == 'WatchEvent'}
		<MiniPost
			date={event.created_at}
			title={$t(`GitHubActivity.${event.type}`, {
				repo: event.repo.name
			})}
		/>
	{:else}
		<MiniPost
			date={event.created_at}
			title={$t('GitHubActivity.UnknownEvent', { ...event })}
			subtitle={$t('GitHubActivity.UnknownEventSubtitle', { ...event })}
		/>
	{/if}
</div>
