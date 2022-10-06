import { checkCacheState, updateCacheState } from '$lib/api/helper';
import { GitHubUsername, ignoredRepos } from '$lib/common';
import type { RequestHandler } from '@sveltejs/kit';
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
				throw 'Faulty response';
			}

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
					const readme = await fetch(
						`https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${repo.defaultBranchRef.name}/README.md`
					);
					// Save text if status is 200, otherwise save an empty string
					const readmeText = readme.status == 200 ? await readme.text() : '';
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
							readMe: readmeText
						}
					});
				})
			);

			console.log('[projects.json.ts]: Cache updated');

			// Update the cache state
			await updateCacheState(id);
		} catch (error) {
			return new Response(
				JSON.stringify(
					await prisma.githubRepo.findMany({
						where: {
							name: {
								notIn: ignoredRepos
							}
						}
					})
				),
				{
					status: 500
				}
			);
		}
	}

	return new Response(
		JSON.stringify(
			await prisma.githubRepo.findMany({
				where: {
					name: {
						notIn: ignoredRepos
					}
				}
			})
		)
	);
};
