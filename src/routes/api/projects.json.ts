import { checkCacheState, updateCacheState } from '$lib/api/helper';
import { GitHubUsername } from '$lib/common';
import type { RequestHandler } from '@sveltejs/kit';
import { getCacheData } from '$lib/api/helper';
import { prisma } from '$lib/prisma';

export const GET: RequestHandler = async () => {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('github-repos');

	if (!cacheState) {
		console.log('[projects.json.ts]: Updating cache');

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
							user(login: "${GitHubUsername}") {
								pinnedItems(first: 6) {
									edges {
										node {
											... on Repository {
												name
											}
										}
									}
								}
								repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
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
									}
								}
							}
						}
					`
				})
			});

			const json = await response.json();

			const pinnedRepos = json.data.user.pinnedItems.edges.map((item) => item.node.name);

			// Remove old cache
			await prisma.githubRepo.deleteMany();

			// Save the data in the cache
			await Promise.all(
				json.data.user.repositories.nodes.map(async (repo) => {
					console.log('[projects.json.ts]: Saving repo ' + repo.name);
					const topics = JSON.stringify(
						repo.repositoryTopics.nodes.map((topic) => topic.topic.name)
					);
					return prisma.githubRepo.create({
						data: {
							id: repo.databaseId,
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
							updatedAt: repo.updatedAt
						}
					});
				})
			);

			console.log('[projects.json.ts]: Cache updated');

			// Update the cache state
			await updateCacheState(id);
		} catch (error) {
			return {
				status: 500,
				...(await getCacheData(id))
			};
		}
	}

	return {
		body: await prisma.githubRepo.findMany()
	};
};
