import type { PageServerLoad } from './$types';
import { checkCacheState, updateCacheState } from '$lib/api/helper';
import { prisma } from '$lib/prisma';
import type { GithubRepo } from '@prisma/client';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad<{ repos: GithubRepo[] }> = async () => {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('github-repos');

	if (!cacheState) {
		console.log('[projects/+page.server.ts]: Updating cache');

		// Get new JSON data from GitHub
		try {
			const response = await fetch('https://api.github.com/graphql', {
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
				},
				method: 'POST',
				body: JSON.stringify({
					query: `
						query {
							user(login: "${process.env['GITHUB_USERNAME']}") {
								pinnedItems(first: 6) {
									edges {
										node {
											... on Repository {
												name
											}
										}
									}
								}
								repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
									nodes {
										databaseId
										name
										description
										url
										isFork
										parent {
											nameWithOwner
											url
										}
										primaryLanguage {
											name
										}
										forkCount
										stargazerCount
										repositoryTopics(first: 10) {
											nodes {
												topic {
													name
												}
											}
										}
										openGraphImageUrl
										createdAt
										updatedAt
										owner {
											login
										}
										defaultBranchRef {
											name
										}
									}
								}
							}
						}
					`
				})
			});

			if (response.status != 200) {
				console.log(`[projects/+page.server.ts]: Status: ${response.status}`);
				console.debug(`[projects/+page.server.ts]: Response: ${await response.text()}`);
				throw 'Faulty response';
			}

			const json = await response.json();

			const pinnedRepos = json.data.user.pinnedItems.edges.map((item) => item.node.name);

			// Remove old cache
			await prisma.githubRepo.deleteMany();

			// Save the data in the cache
			await Promise.all(
				json.data.user.repositories.nodes.map(async (repo) => {
					console.log('[projects/+page.server.ts]: Saving repo ' + repo.name);

					const topics = JSON.stringify(
						repo.repositoryTopics.nodes.map((topic) => topic.topic.name)
					);

					// Check if there is a detail page
					const detailPage = await prisma.page.findFirst({
						where: {
							pageType: 'REPO',
							slug: `${repo.owner.login}/${repo.name}`
						}
					});

					return prisma.githubRepo.create({
						data: {
							id: repo.databaseId,
							owner: repo.owner.login,
							name: repo.name,
							description: repo.description,
							url: repo.url,
							fork: repo.isFork,
							parentName: repo.parent?.nameWithOwner,
							parentUrl: repo.parent?.url,
							language: repo.primaryLanguage?.name,
							forksCount: repo.forkCount,
							stargazersCount: repo.stargazerCount,
							topics,
							image: repo.openGraphImageUrl,
							pinned: pinnedRepos.includes(repo.name),
							createdAt: repo.createdAt,
							updatedAt: repo.updatedAt,
							detailPage: Boolean(detailPage)
						}
					});
				})
			);

			console.log('[projects/+page.server.ts]: Cache updated');

			// Update the cache state
			await updateCacheState(id);
		} catch (error) {
			console.log('[projects/+page.server.ts]: Failed to update cache', error);
		}
	}

	let ignoredRepos = process.env['IGNORED_REPOS'] ?? '[]';
	ignoredRepos = ignoredRepos.replaceAll("'", '"');

	console.log(JSON.parse(ignoredRepos));

	return {
		repos: await prisma.githubRepo.findMany({
			where: {
				name: {
					notIn: JSON.parse(ignoredRepos),
					mode: 'insensitive'
				}
			}
		})
	};
};
