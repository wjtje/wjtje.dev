import type { GithubEvent } from '$lib/@types/github';
import {
	checkCacheState,
	getCacheData,
	saveCacheData,
	updateCacheState,
	type RemoteData
} from '$lib/api/helper';
import { GitHubUsername } from '$lib/common';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from './__types/github.json';

export const get: RequestHandler = async () => {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('github');

	if (!cacheState) {
		console.log('[github.json.ts]: Updating cache');

		// Get new JSON data from GitHub
		try {
			const response = await fetch(
				`https://api.github.com/users/${GitHubUsername}/events/public?per_page=10`
			);
			const json: GithubEvent<any>[] = await response.json(); // eslint-disable-line @typescript-eslint/no-explicit-any

			// Remove old cache
			await prisma.remoteData.deleteMany({
				where: {
					remoteSource: {
						name: 'github'
					}
				}
			});

			// Save the data in the cache
			await Promise.all(
				json.map(async (event) => {
					// Create base object
					const data: RemoteData = {
						date: event.created_at,
						mainTitle: {
							id: 'GitHubActivity.UnknownEvent',
							data: {
								type: event.type
							}
						},
						subTitle: {
							id: 'GitHubActivity.UnknownEventSubtitle',
							data: {
								id: event.id
							}
						}
					};

					// Generate correct data for each event
					switch (event.type) {
						case 'CommitCommentEvent':
							data.mainTitle = {
								id: 'GitHubActivity.CommitCommentEvent',
								data: {
									html_url: event?.payload?.commit?.html_url,
									repo: event.repo.name
								}
							};
							data.subTitle = event.payload?.commit?.body;
							break;
						case 'CreateEvent':
						case 'DeleteEvent':
							data.mainTitle = {
								id: `GitHubActivity.${event.type}.${event.payload?.ref_type ?? 'unknown'}`,
								data: {
									ref: event.payload?.ref,
									ref_type: event.payload?.ref_type,
									repo: event.repo.name,
									id: event.id
								}
							};
							data.subTitle = null;
							break;
						case 'ForkEvent':
							data.mainTitle = {
								id: 'GitHubActivity.ForkEvent',
								data: {
									html_url: event.payload?.forkee?.html_url,
									repo: event.repo.name
								}
							};
							data.subTitle = null;
							break;
						case 'GollumEvent':
							data.mainTitle = {
								id: 'GitHubActivity.GollumEvent',
								data: {
									repo: event.repo.name
								}
							};
							data.subTitle = {
								id: 'GitHubActivity.GollumEventSubtitle',
								data: {
									pages: event.payload?.pages?.length ?? 0
								}
							};
							break;
						case 'IssueCommentEvent':
							// Only show this event for some of it's actions
							if (
								event.payload?.action == 'created' ||
								event.payload?.action == 'edited' ||
								event.payload?.action == 'deleted'
							) {
								data.mainTitle = {
									id: `GitHubActivity.IssueCommentEvent.${event.payload?.action}`,
									data: {
										issue_html: event.payload?.issue?.html_url,
										repo: event.repo.name
									}
								};
							} else {
								data.mainTitle = {
									id: `GitHubActivity.IssueCommentEvent.unknown`,
									data: {
										id: event.id
									}
								};
							}

							if (event.payload?.action == 'created' || event.payload?.action == 'edited') {
								data.subTitle = event.payload?.comment?.body ?? event.payload?.issue?.title;
							} else {
								data.subTitle = null;
							}
							break;
						case 'IssuesEvent':
							// Only show this event for some of it's actions
							if (
								event.payload?.action == 'opened' ||
								event.payload?.action == 'edited' ||
								event.payload?.action == 'closed'
							) {
								data.mainTitle = {
									id: `GitHubActivity.IssuesEvent.${event.payload?.action}`,
									data: {
										issue_html: event.payload?.issue?.html_url,
										repo: event.repo.name
									}
								};
							} else {
								data.mainTitle = {
									id: `GitHubActivity.IssuesEvent.unknown`,
									data: {
										id: event.id
									}
								};
							}

							data.subTitle = event.payload?.issue?.title;
							break;
						case 'MemberEvent':
							if (event.payload?.action == 'added') {
								data.mainTitle = {
									id: `GitHubActivity.MemberEvent.added`,
									data: {
										member: event.payload?.member?.login,
										member_url: event.payload?.member?.url,
										repo: event.repo.name
									}
								};
							} else {
								data.mainTitle = {
									id: 'GitHubActivity.MemberEvent.unknown',
									data: {
										id: event.id
									}
								};
							}

							data.subTitle = event.payload?.issue?.title;
							break;
						case 'PublicEvent':
							data.mainTitle = {
								id: 'GitHubActivity.PublicEvent',
								data: {
									repo: event.repo.name
								}
							};
							data.subTitle = null;
							break;
						case 'PullRequestEvent':
							// Only show this event for some of it's actions
							if (
								event.payload?.action == 'opened' ||
								event.payload?.action == 'edited' ||
								event.payload?.action == 'closed' ||
								event.payload?.action == 'reopened'
							) {
								data.mainTitle = {
									id: `GitHubActivity.PullRequestEvent.${event.payload?.action}`,
									data: {
										repo: event.repo.name
									}
								};

								data.subTitle = {
									id: 'GitHubActivity.PullRequestEvent.subtitle',
									data: {
										title: event.payload?.pull_request?.title,
										html_url: event.payload?.pull_request?.html_url,
										changed_files: event.payload?.pull_request?.changed_files
									}
								};
							} else {
								data.mainTitle = {
									id: `GitHubActivity.PullRequestEvent.unknown`,
									data: {
										id: event.id
									}
								};
								data.subTitle = null;
							}
							break;
						case 'PullRequestReviewCommentEvent':
							data.mainTitle = {
								id: 'GitHubActivity.PullRequestReviewCommentEvent',
								data: {
									comment_url: event.payload?.comment?.html_url,
									pull_request_url: event.payload?.pull_request?.html_url,
									pull_request: event.payload?.pull_request?.title,
									repo: event.repo.name
								}
							};
							data.subTitle = null;
							break;
						case 'PushEvent':
							data.mainTitle = {
								id: 'GitHubActivity.PushEvent',
								data: {
									size: event.payload?.size,
									repo: event.repo.name
								}
							};
							data.subTitle = {
								id: 'GitHubActivity.PushEventSubtitle',
								data: {
									commit: event.payload?.commits[0]?.message ?? '',
									size: event.payload?.size
								}
							};
							break;
						case 'ReleaseEvent':
							data.mainTitle = {
								id: 'GitHubActivity.ReleaseEvent',
								data: {
									repo: event.repo.name,
									html_url: event.payload?.release.html_url,
									name: event.payload?.release.name
								}
							};
							data.subTitle = event.payload?.release.body;
							break;
						case 'WatchEvent':
							data.mainTitle = {
								id: 'GitHubActivity.WatchEvent',
								data: {
									repo: event.repo.name
								}
							};
							data.subTitle = null;
							break;
					}

					// Save object inside database
					await saveCacheData(data, id);
				})
			);

			// Update the cache state
			await updateCacheState(id);
		} catch {
			return {
				status: 500,
				...(await getCacheData(id))
			};
		}
	}

	return await getCacheData(id);
};
